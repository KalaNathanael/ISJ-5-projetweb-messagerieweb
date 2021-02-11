const User=require('../models/user');
const Contact=require('../models/contact');
const Message=require('../models/message');
//const bcrypt=require('bcrypt');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const digitCode=require('../services/verificationService');
const send=require('../services/smsService');


exports.home=(req,res,next)=>{
     console.log(req.body);
  send.sendSMS(req.body.phoneNumber,req.body.message)   ;       
   // res.json({ message: 'code digit '+code });
     next();


};

exports.sms= async(req,res,next)=>{
    //console.log(req.body);
    try{
    send.sendSMS(req.body.phoneNumber,req.body.message);
    res.status(400).json({message:"message sended"});
    }
    catch(error){
        res.status(400).json(error);

    }
  // res.json({ message: 'code digit '+code });
    next();


};

exports.test=(req,res,next)=>{
          
      res.json({message:req.body.name});
      next();
};

   exports.allUser=(req,res,next)=>{

       User.find().then(
           (users)=>{
               res.status(200).json(users);
           }
       ).catch(
           (error)=>{
               res.status(400).json(
                   {error:error}
               );
           }
       );

   };
   exports.oneUser=(req,res,next)=>{
    User.findOne({
        _id:req.params.id
    }).then(
        (user)=>{ res.status(200).json(user);}
    ).catch(
          (error)=>{
              res.status(404).json({error:error});
          }
    );



   };

   exports.login=(req,res,next)=>{

      User.findOne({username:req.body.username}).then(user=>{

        if(!user){
             return res.status(401).json({error:"user no find"});
        }

        bcryptjs.compare(req.body.password,user.password).then(valid=>{
            if(!valid){

                res.status(401).json({error:'password is not correct'});
            }
              

            res.status(200).json({
                userId:user._id,
                token:jwt.sign({userId:user._id}, 'RANDOM_TOKEN_SECRET',{expiresIn:'24h'}
                )
            });
        }).catch(error =>res.status(500).json({error}));
      }).catch(error=>res.status(500).json({error}));

   };

exports.createUser=(req,res,next)=>{

    bcryptjs.hash(req.body.password, 10)
    .then(hash => {
        const user=new User({
      username:req.body.username,
      name:req.body.name,
      phone:req.body.phone,
      password:hash,
      email:req.body.email,
      isphoneverified:false,
      isemailverified:false
    });


    user.save().then(
        ()=>{
            res.status(201).json({
                message:"user added successfull",
                data: user
            });
        }
   
      ).catch(
          (error)=>{
              res.status(400).json({
                  error:error
              });
          }
      )

   }).catch(error => res.status(500).json({ error }));
   


};

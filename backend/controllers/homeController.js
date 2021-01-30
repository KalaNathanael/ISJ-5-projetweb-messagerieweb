const User=require('../models/user');
const Contact=require('../models/contact');
const Message=require('../models/message');



exports.home=(req,res,next)=>{

    res.json({ message: 'Votre requête a bien été effectue !' });
     next();


};

exports.createUser=(req,res,next)=>{

   const user=new User({

      username:req.body.username,
      name:req.body.name,
      phone:req.body.phone,
      email:req.body.email,
      password:req.body.password,
      isphoneverified:false,
      isemailverified:false

   });
   user.save().then(
     ()=>{
         res.status(201).json({
             message:"user added successfull"
         });
     }

   ).catch(
       (error)=>{
           res.status(400).json({
               error:error
           });
       }
   )


};

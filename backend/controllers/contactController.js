const Contact=require('../models/contact');
const Message=require('../models/message');
const user = require('../models/user');

exports.addContact=(req,res,next)=>{

    const contact=new Contact({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        user:req.body.user
    });
      contact.save().then(
          ()=>{
              res.status(201).json({'message':'contact added successfull'});
          }
      ).catch(
          (error)=>{
              res.status(400).json({error:error});
          }
      );
        };

      exports.oneContact=(req,res,next)=>{
           Contact.findOne({
               _id:req.params.id
           }).then(
               (contact)=>{
                 res.status(201).json(contact);       
               }
           ).catch(
               (error)=>{
                     res.status(404).json(error);   
               }
           );


      };

      exports.allContactOfUser=(req,res,next)=>{
          Contact.find({user:req.params.user}).then(
              (contacts)=>{
                        res.status(201).json(contacts);
              }
          ).catch(
                  (error)=>{
                      res.status(404).json(error);
                  }
              
          );

      };

      exports.deleteContact=(req,res,next)=>{
         Contact.deleteOne({_id:req.params.id}).then(
            ()=>{
                      res.status(201).json({'message':'contact deleted successfully'});
            }
        ).catch(
                (error)=>{
                    res.status(404).json(error);
                }
            
        );

      };

      exports.updateContact=(req,res,next)=>{
           const contact=new Contact({
               _id:req.params.id,
                name:req.body.name,
                phone:req.body.phone,
                email:req.body.email,
                user:req.body.user

           });
           Contact.updateOne({_id:req.params.id},contact).then(
            ()=>{
                      res.status(201).json({'message':'contact updated successfully '});
            }
        ).catch(
                (error)=>{
                    res.status(404).json(error);
                }
            
        );
         
      };
      






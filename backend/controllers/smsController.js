const digitCode=require('../services/verificationService');
const sms=require('../services/smsService');

exports.sendSms=async(req,res,next)=>{

    try{
        sms.sendSMS(req.body.phoneNumber,req.body.message);
        res.status(400).json({message:"message sended"});
        }
        catch(error){
            res.status(400).json(error);
    
        }


}
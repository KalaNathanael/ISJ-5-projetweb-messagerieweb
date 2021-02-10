const jwt=require('jsonwebtoken');
// ici on cree le middleware qui va se charger de verfier la validite du token
module.exports=(req,res,next)=>{
    //console.log(req.headers.authorization.split(' ')[1]);

    try{
        const token=req.headers.authorization.split(' ')[1];

        const decodedToken=jwt.verify(token,'RANDOM_TOKEN_SECRET');

        const userId=decodedToken.userId;
        if(req.body.userId && req.userId !=userId){
            throw 'Invalid user ID';
        }
        else{
            next();
        }
    }catch{
        res.status(401).json({error: 'NOT ACCESS API'});
    }

};
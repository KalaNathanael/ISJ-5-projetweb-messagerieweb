const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    username: { type: String, required: true,unique:true },
    name:{ type: String, required: true},
    phone:{type:Number,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isphoneverified:{type:Boolean,required:true},
    isemailverified:{type:Boolean,required:true},
  
  });
  userSchema.plugin(uniqueValidator);

  
  module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    name:{ type: String, required: true},
    phone:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    isphoneverified:{type:Boolean,required:true},
    isemailverified:{type:Boolean,required:true},
  
  });
  
  module.exports = mongoose.model('User', userSchema);
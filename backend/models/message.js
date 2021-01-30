const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    status:{ type: String, required: true},
    contact:{type:Number,required:true},
    body:{type:String,required:true},
    expediteur:{type:String, required:true}
    
  });
  
  module.exports = mongoose.model('Message', messageSchema);
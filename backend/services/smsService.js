const https = require('https');
const axios = require('axios')

exports.sendSMS=(number,message)=>{
    
         return new Promise((resolve,reject)=>{
      

     axios.defaults.baseURL = 'http://proxysms.azieleh.com';

     axios.defaults.headers.common['Authorization'] = 'Basic '+Buffer.from('f16187da70b6:b6901d40-f211-930a-8e0c-1cdad7a64f99').toString('base64');
     axios.post('/api/v0/shortMessages', {
        phoneNumber: number,
        message: message
      })
      .then(function (response) {
        console.log(response.data);
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });

  
     }
      );

};

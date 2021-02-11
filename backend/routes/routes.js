const express = require('express');

const router = express.Router();

const controller=require('../controllers/homeController');
const contactController=require('../controllers/contactController');
const auth=require('../middlewares/auth');

// ici on met les differentes routes

   router.get('/',controller.home);
   router.post('/testSMS',controller.sms);

   router.post('/add-user',controller.createUser);
   router.post('/test',controller.test);
   router.get('/users',auth,controller.allUser);
   router.post('/signin',controller.login);
   router.get('/user/:id',controller.oneUser);
   router.post('/add-contact',auth,contactController.addContact);
   router.get('/contact/:id',auth,contactController.oneContact);
   router.get('/contacts/:user',auth,contactController.allContactOfUser);
   router.put('/update-contact/:id',auth,contactController.updateContact);
   router.delete('/delete-contact/:id',auth,contactController.deleteContact);
    //auth c'est le middleware qui oblige les utilisateurs a avoir leur token pour acceder aux api

module.exports = router;
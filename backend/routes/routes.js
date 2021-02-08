const express = require('express');

const router = express.Router();

const controller=require('../controllers/homeController');
const auth=require('../middlewares/auth');

// ici on met les differentes routes
   router.get('/',controller.home);
   router.post('/add-user',controller.createUser);
   router.post('/test',controller.test);
   router.get('/users',auth,controller.allUser);
   router.post('/signin',controller.login);
   router.get('/user/:id',controller.oneUser);


module.exports = router;
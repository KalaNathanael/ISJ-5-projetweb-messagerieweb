const express = require('express');

const router = express.Router();

const controller=require('../controllers/homeController');

// ici on met les differentes routes
   router.get('/',controller.home);
   router.post('/add-user',controller.createUser);
   router.post('/test',controller.test);

module.exports = router;
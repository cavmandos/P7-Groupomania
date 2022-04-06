const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

//Middlewares

const auth = require("../middlewares/auth");

//Routes

router.get('/:id', auth, authController.getOneUser);
router.post('/register', authController.register );
router.post('/login', authController.login);
router.put('/update/:id', auth, authController.updateUser);
router.delete('/delete', auth, authController.deleteUser);
router.get('/', auth, authController.getAllUsers);

//Export

module.exports = router;

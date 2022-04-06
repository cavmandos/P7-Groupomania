const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comments');

//Middlewares

const auth = require("../middlewares/auth");

//Routes

router.get('/', auth, commentCtrl.getAllComments);
router.get('/:id', auth, commentCtrl.getOneComment);
router.post('/', commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.updateComment);
router.delete('/:id',auth, commentCtrl.deleteComment);

//Export

module.exports = router;

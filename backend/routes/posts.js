const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");

//Middlewares

const auth = require("../middlewares/auth");

//Routes

router.get("/", auth, postsCtrl.getAllPosts);
router.get('/:id', auth, postsCtrl.getOnePost);
router.post('/', auth, postsCtrl.createPost);
router.put('/:id', auth, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost);

//Export

module.exports = router;
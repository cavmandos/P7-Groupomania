const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");

//Middlewares

const auth = require("../middlewares/auth");

//Routes

router.get("/", postsCtrl.getAllPosts);
router.get('/:id', postsCtrl.getOnePost);
router.post('/', postsCtrl.createPost);
router.put('/:id', auth, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost);

//Export

module.exports = router;
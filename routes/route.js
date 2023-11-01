const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/controller");
const middleware = require("../helper/validation/joi");
const auth = require("../helper/auth/auth");

router.post("/signup", middleware.signUpVal, userCtrl.signup);
router.post("/login", middleware.loginVal, userCtrl.login);
router.post("/create-post",auth.checkToken, userCtrl.createPost);
router.post("/update-post",middleware.updatePostVal, auth.checkToken, userCtrl.updatePost);
router.post("/add-comment",auth.checkToken, userCtrl.addComment);
router.post("/update-comment",middleware.updateCommenttVal,auth.checkToken, userCtrl.addComment);
router.get("/post-list",userCtrl.postList);
router.get("/comment-list",userCtrl.commentList);
router.get("/post-comments",userCtrl.postAndComments);


module.exports = router;

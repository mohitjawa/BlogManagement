const {
  User,
  Post,
  Comment
} = require("../model/index");
const codeAndMessage = require("../helper/error-code-message/error-code-message");
const Utility = require("../helper/utilities/common");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

exports.signup = async (req, res) => {
  try {
    const { name, email, userName,password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] })
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          message: "Email already registered",
        });
      } else {
        return res.status(400).json({
          message: "Username already registered",
        });
      }
    }
    const hashPassword = await Utility.encryptPassword(password);
    User.create({name,email,userName,password:hashPassword})
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  }catch (error) {
    console.log(error)
    return res.status(codeAndMessage.badRequestCode).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { userName,password } = req.body;
    const UserExist = await User.findOne({ userName });
    if (UserExist == null) {
      return res.status(200).json({
        message: codeAndMessage.notFoundUserMessage,
      });
    }
    const hashPassword = await Utility.validatePassword(
      password,
      UserExist.password
    );
    if (!hashPassword) {
      return res.status(404).json({
        message: codeAndMessage.incorrectPass,
      });
    }
    const token = jwt.sign(
      {
        data: UserExist._id,
      },
      process.env.JWTPASS,
      {
        expiresIn: "23h",
      }
    );
    return res.status(codeAndMessage.successOk).json({
      message: codeAndMessage.successMessage,
      token: token,
      data: await User.findOne({ userName },{password:0,__v:0}),
    });
  } catch (error) {
    console.log(error)
    return res.status(codeAndMessage.badRequestCode).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.createPost = async (req, res) => {
  try {
    const {title,content}=req.body
   await Post.create({title,content,userId:req.userId})
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const {postId,title,content}=req.body;
    let Query={}
    if(req.body.isDeleted){
     Query={isDeleted:true}
    }else{
      Query={$set:{title:title,content:content}}
    }
    await Post.findOneAndUpdate({userId:req.userId,_id:postId},Query)
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.addComment = async (req, res) => {
  try {
    const {postId,content}=req.body
   await Comment.create({postId,content,userId:req.userId})
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.updateComment = async (req, res) => {
  try {
    const {commentId,content}=req.body;
    let Query={}
    if(req.body.isDeleted){
     Query={isDeleted:true}
    }else{
      Query={$set:{content:content}}
    }
    await Comment.findOneAndUpdate({userId:req.userId,_id:commentId},Query)
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.postList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit
  try {
    const totalDocuments = await Post.countDocuments({isDeleted:false});
    const totalPages = Math.ceil(totalDocuments / limit);
    const post = await Post.find({isDeleted:false}).limit(limit).skip(skip).sort({createdAt:-1})

   return res.status(200).json({
      httpCode: 200,
      code: 200,
      data: post,
      message: 'Success',
      currentPage: page,
      totalPage: totalPages,
    })
  } catch (error) {
    return res.status(400).json({ error: 'An error occurred' });
  }
}
exports.commentList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit
  try {
    const totalDocuments = await Comment.countDocuments({isDeleted:false});
    const totalPages = Math.ceil(totalDocuments / limit);
    const post = await Comment.find({isDeleted:false}).populate('postId','title content').limit(limit).skip(skip).sort({createdAt:-1})

   return res.status(200).json({
      httpCode: 200,
      code: 200,
      data: post,
      message: 'Success',
      currentPage: page,
      totalPage: totalPages,
    })
  } catch (error) {
    return res.status(400).json({ error: 'An error occurred' });
  }
}
exports.postAndComments = async (req, res) => {
  try {
    const {postId}=req.query; 
    const comments = await Comment.find({ postId,isDeleted:false })
      .populate('postId', 'title content');

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this post' });
    }
  
    const postDetails = {
      postId: comments[0].postId._id,
      postTitle: comments[0].postId.title,
      postContent: comments[0].postId.content,
      comments: comments.map(comment => ({
        _id: comment._id,
        content: comment.content,
        userId: comment.userId,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      })),
    };
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
      data:postDetails
    });
  } catch (error) {
    console.log(error)
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};


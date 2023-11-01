const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  postId: { type: String,ref:'post'},
  content:{type:String},
  isDeleted:{type:Boolean,default:false},
  userId:{type:String,ref:'user'}
},{timestamps:true})

module.exports = mongoose.model('comment', commentSchema)
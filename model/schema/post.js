const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: String},
  content:{type:String},
  isDeleted:{type:Boolean,default:false},
  userId:{type:String,ref:'user'},
},{timestamps:true})

module.exports = mongoose.model('post', postSchema)

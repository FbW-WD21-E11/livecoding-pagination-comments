import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const commentSchema = new Schema({
    name:String,
    email:String,
    movie_id:mongoose.Schema.Types.ObjectId,//uses the mongodb datatype ObjectId
    text:String,
    date:{type:Date, default:Date.now}
});

const Comment = model('Comment', commentSchema);

export default Comment;
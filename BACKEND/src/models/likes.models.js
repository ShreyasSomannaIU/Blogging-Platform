import mongoose from 'mongoose' 

const likeSchema = new Schema({
  
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  blog: { 
    type: Schema.Types.ObjectId, 
    ref: 'Blog', required: true 
  }  
},
{ timestamps: true })


export const like = mongoose.model('like', likeSchema);

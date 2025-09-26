import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  name: { 
    type: String 
},

  role: { 
    type: String, 
    default: 'User' 
}, 

  profileImgUrl: { 
    type: String 
},
  profileImgUrlPublicId: { 
    type: String 
},
  blogs: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Blog' 
}]
}, 
{
  timestamps: true 
});

export const User = mongoose.model('User', userSchema);

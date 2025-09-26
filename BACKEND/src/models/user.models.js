import mongoose from "mongoose";
import { blog } from "./blogs.models";

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
    ref: 'blog' 
}]
}, 
{
  timestamps: true 
});

export const user = mongoose.model('user', userSchema);

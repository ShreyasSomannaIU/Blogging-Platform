import mongoose from "mongoose";
import { user } from "./user.models.js";
import { like } from "./likes.models.js";
import { Comment } from "./comments.models.js";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: { 
        type: Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    likes: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'like' 
    }],

    hashTags: { 
        type: String, 
        maxlength: 5000 
    },
    img: { 
        type: String, 
        maxlength: 5000 
    },
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'comment' 
    }]
},
{ 
    timestamps: true 
})

export const blog = mongoose.model('blog', blogSchema);
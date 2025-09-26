import mongoose from "mongoose";

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
        ref: 'User', required: true
    },
    likes: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'BlogLike' 
    }],

    hashTags: { 
        type: String, maxlength: 5000 
    },
    img: { 
        type: String, 
        maxlength: 5000 
    },
    comments: [{ 
        type: Schema.Types.ObjectId, ref: 'BlogComment' 
    }]
},
{ timestamps: true })

export const Blog = mongoose.model('Blog', blogSchema);
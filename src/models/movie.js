const mongoose = require('mongoose')
const Schema = mongoose.Schema
const movieSchema  = new Schema({
    title: {
        type:String,
        required: [true, "poster_path is required"]
    },
    rating:{
        type:Number,
        required: [true, "rating is required"]
    },
    user:{
        type: Schema.Types.ObjectId,
        required: [true, "user is required"],
        ref:'user'
    },
    
},
{
    timestamps: true,
  }
)


module.exports = mongoose.model('movie', movieSchema)
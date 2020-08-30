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
    }
    // id:{
    //     type:Number,
    //     required: [true, "id is required"]
    // },
    // popularity: {
    //     type:Number,
    //     required: [true, "popularity is required"]
    // },
    // vote_count: {
    //     type:Number,
    //     required: [true, "vote_count is required"]
    // },
    // video: {
    //     type:Boolean,
    //     default:true
    // },
    // adult: {
    //     type:Boolean,
    //     default:true
    // },
    // poster_path: {
    //     type:String,
    //     required: [true, "poster_path is required"]
    // },
    // backdrop_path: {
    //     type:String,
    //     required: [true, "popularity is required"]
    // },
    // vote_average: {
    //     type:Number,
    //     required: [true, "vote_average is required"]
    // },
    // original_title: {
    //     type:String,
    //     required: [true, "poster_path is required"]
    // },
    // original_language: {
    //     type:String,
    //     required: [true, "poster_path is required"]
    // },
    // overview: {
    //     type:String,
    //     required: [true, "poster_path is required"]
    // },
    // release_date: {
    //     type:String,
    //     required: [true, "poster_path is required"]
    // },
    // genre_ids: {
    //     type:Object,
    //     required: [true, "poster_path is required"]
    // },
},
{
    timestamps: true,
  }
)


module.exports = mongoose.model('movie', movieSchema)
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const userSchema  = new Schema({
    email:{
        type:String,
        trim: true,
        required: [true, "Email is required"]
    },
    userName:{
      type:String,
      trim: true,
      required: [true, "userName is required"]
  },
    password: {
        type:String,
        trim: true,
        required: [true, "Password is required"]
    }
},
{
    timestamps: true,
  }
)


userSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  });
module.exports = mongoose.model('user', userSchema)
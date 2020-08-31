const mongoose = require('mongoose')
const config = require('./parameters')

//map global promise - get rid of warning
mongoose.promise=global.promise;
module.exports = ()=>{
    let url =config.atlasDatabaseURI
    
    mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => {
        console.log("dataBase connection has been established")
    })
    .catch(err => {
        console.log("There was an error while connecting to the database.")
    })
}
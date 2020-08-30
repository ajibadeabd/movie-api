const dotEnv = require('dotenv')
const dotConnnected = dotEnv.config();

if(!dotConnnected) console.log("Could not find dotEnv file,please create one")

module.exports = {
    port: process.env.PORT,
    localDatabaseURI : process.env.localDatabaseURI, 
    atlasDatabaseURI : process.env.atlasDatabaseURI,
    jwtSecret: process.env.jwtSecret,
    accessTokenexpires_expiresIn: process.env.accessTokenexpires_expiresIn,
    refreshToken_expiresIn: process.env.refreshToken_expiresIn,
    mvdb_api_key:process.env.mvdb_api_key
}


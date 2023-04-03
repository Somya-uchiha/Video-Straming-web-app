const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id},"romeesh",{
        expiresIn:"30d"
    })
}

module.exports=generateToken;
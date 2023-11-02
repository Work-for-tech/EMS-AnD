const bcrypt = require('bcrypt')
const saltRound=10

module.exports.hashSync=(pass)=>{
    return bcrypt.hashSync(pass,saltRound)
}

module.exports.comSync=(pass,key)=>{
    return bcrypt.compareSync(pass,key)
}   
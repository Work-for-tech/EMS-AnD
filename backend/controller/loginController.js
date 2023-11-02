const bcrypt = require('../util/passwordGen');
const jwtToken = require('../util/jwtToken')
const userSchema = require('../models/employeeSchema')
const accessSchema = require('../models/accessSchema')

module.exports.loginUser = (async (req, res) => {
    try {
        const user = await userSchema.find({ "email": req.body.email }).exec();
        if (user.length == 0 || user == null) {
            res.status(400).json({ message: "No data Found" });
        }
        else {
            const password = user[0].password;
            if (bcrypt.comSync(req.body.password, password) == true) {
                var userAccess = await accessSchema.findOne({ userId: user[0]._id })
                var userToken = jwtToken.generateToken({ data: userAccess })
                res.status(200).json({ message: "User Fetched", user: userToken });
            }
            else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        }
    }
    catch (err) {
        res.status(-9).json({
            message: "Error while Login.",
            data: err,
        });
    }
})
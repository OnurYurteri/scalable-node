var AppService = require('./service')


exports.login = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    try {
        let users = await AppService.createToken({ user: "onur" })
        return res.status(200).json({ status: 200, data: users, message: "Login Succesfully!" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}
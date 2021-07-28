const authService = require('../services/auth-service')

const adminOnly = async (req,res,next) => {
    if (!req.cookies.authorization) {
        res.status(401).send("Invalid Authorization")
    } else {
        const user = await authService.getUserFromToken(req.cookies.authorization)
        if (user.role === "ADMIN") {
            console.log("Valid Admin: " + user.userName + " " + user.role)
            next()
        } else {
            console.error("InValid Admin: " + user.userName + " " + user.role)
            res.status(401).send("User is not an admin")
        }
    }
}

module.exports = adminOnly
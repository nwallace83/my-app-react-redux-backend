const authService = require('../services/auth-service')

const adminOnly = (req,res,next) => {
    if (!req.cookies.authorization) {
        res.status(401).send("Invalid Authorization")
    } else {
        authService.getUserFromToken(req.cookies.authorization).then(tokenUser => {
            if (tokenUser) {
                authService.fetchUser(tokenUser.userName).then(user => {
                    if (user && user.role === "ADMIN") {
                        console.log("Valid Admin: " + user.userName + " " + user.role)
                        next()
                    } else {
                        console.error("InValid Admin: " + user)
                        res.status(401).send("User is not an admin")
                    }
                })
            } else {
                res.sendStatus(401)
            }
        }).catch(err => {
            console.log(err)
            res.status(401).send("An Error Occured")
        })
    }
}

module.exports = adminOnly
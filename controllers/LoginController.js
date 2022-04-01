const bcrypt = require("bcryptjs")
const User = require("../models/User")

//handle all login, logout, register request
const registerView = (req, res) => {
    res.render("register", {

    })
}

const loginView = (req, res) => {
    res.render("login", {

    })
}

const registerUser = (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        console.log("Missing parameters")
    }

    //check email duplicate
    User.findOne({ email: email}).then( (user) => {
        if(user){
            console.log('Email has existed!')
            res.render('register', {
                name, email, password
            })
        } else {
            const newUser = new User({
                name,email,password
            })
            //hashing password
            bcrypt.genSalt(10, (err,salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then(
                            res.redirect('/login')
                        )
                        .catch((err) => console.log(err))
                }) 
            )
        }
    })
}

module.exports = {
    registerView,
    loginView,
    registerUser
}
const bcrypt = require("bcryptjs")
const User = require("../models/User")

LocalStrategy = require('passport-local').Strategy

const loginCheck = passport => {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //check login
            User.findOne({ email: email}).then( (user) => {
                if(!user){
                    console.log('Email or Password is wrong!')
                    return done()
                } else {
                    //password compare
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if(error) throw error
                        if(isMatch) {
                            console.log('User logged in')
                            return done(null, user)
                        }else{
                            console.log('Email or Password is wrong!')
                            return done()
                        }
                    })
                }
            })
        })        
    )
    //write user info to local session
    passport.serializeUser((user,done) => {
        done(null, user.id)
    })
    //read user info from local session
    passport.deserializeUser((id,done) => {
        User.findById(id, (error, user) => {
            done(error, user)
        })
    })
}

module.exports = {
    loginCheck
}
//main program
const express = require('express')
const app = express()
const PORT = 3000
const db = require('./db/db')
const passport = require('passport')
const session = require('express-session')
const { loginCheck } = require('./auth/passport')
loginCheck(passport)

const loginRouter = require('./routes/login')

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: 'api-niie',
    saveUnitialized: true,
    resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

//Router
app.use('/',loginRouter)

app.listen(PORT,console.log('Server has started at port ' + PORT))
//main program
const express = require('express')
const app = express()
const PORT = 3000
const db = require('./db/db')

const loginRouter = require('./routes/login')

app.set('view engine','ejs')

//Router
app.use('/',loginRouter)

app.listen(PORT,console.log('Server has started at port ' + PORT))
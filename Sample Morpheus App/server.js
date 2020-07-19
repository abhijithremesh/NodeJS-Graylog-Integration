require('dotenv').config() // imports the env variables from .env

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open',()=> console.log('Connected to Database'))

app.use(express.json())// Setting up server to accept json

const userRouter = require('./routes/users')
app.use('/users', userRouter)

//LISTENING
app.listen(4000, () => {console.log("Server has started on 4000")})



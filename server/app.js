const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

const Employee = mongoose.model('employee')

const mongoUri = 'mongodb+srv://WirlixEmployeeApp:WirlixDev1@cluster0.gbo7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo, yeah!!!')
})
mongoose.connection.on('error',(err)=>{
    console.log('error connecting', err)
})

app.get('/',(req,res)=>{
    res.send('welcome to node js')
})


app.listen(3000),()=>{
    console.log('server running')
}
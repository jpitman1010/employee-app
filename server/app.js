const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

app.use(bodyParser.json())

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

app.post('/send-data',(req,res)=>{
    const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        profilePicture: req.body.profilePicture,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary
    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send('posted successfully')
    }).catch(err=>{
        console.log(err)
    })
})


app.listen(3000),()=>{
    console.log('server running')
}
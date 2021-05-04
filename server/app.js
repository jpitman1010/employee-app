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

//find all employees
app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
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

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send('deleted')
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
                name: req.body.name,
        position: req.body.position,
        profilePicture: req.body.profilePicture,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary
    })
    .then(data=>{
        console.log('updated',data)
        res.send('updated',data)
    }).catch(err=>{
        console.log(err)
    })
})


app.listen(3000),()=>{
    console.log('server running')
}
const mongoose = require('mongoose')
const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    profilePicture: String, 
    salary: String,
    position: String

})

mongoose.model('employee',EmployeeSchema)


const mongoose = require("mongoose");

//Define the Person schema (HOW document will be visible in db)
const personSchema = new mongoose.Schema({
    name: { // Name of the person 
        type: String, 
        required: true 
    }, 
    age: { // Age of the person 
        type: Number, 
        required: true 
    }, 
    work: { // Work of the person 
        type: String, 
        enum: ['chef', 'waiter', 'manager'], // Enum is used to restrict the values of work to these options only
        required: true 
    }, 
    mobile: { // Mobile number of the person 
        type: String, 
        required: true 
    }, 
    email: { // Email address of the person 
        type: String, 
        required: true, 
        unique: true // Unique constraint on email
    }, 
    address: { // Address of the person
        type: String, 
        required: true
    }, 
    salary: { // Salary of the person
        type: Number, 
        required: true
    },
    username: { // Username of the person
        type: String, 
        required: true,
        unique: true // Unique constraint on username
    },
    password: { // Password of the person
        type: String, 
        required: true
    }
});
// Create a model(person model) based on the schema
const Person = mongoose.model("Person", personSchema);
// Export the Person model so that it can be used in other parts of the application
module.exports = Person;
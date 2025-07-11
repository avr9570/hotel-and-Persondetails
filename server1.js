const express = require("express");
const db = require("./db");
require('dotenv').config(); // Load environment variables from .env file
//const person = require("./models/person");

const app = express();



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize())

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next(); // Call the next middleware or route handler directly if no next middleware is there. i.e run the reuqest made to the server
}
app.use(logRequest); // Use the logRequest middleware for all incoming requests

//IN local stratergy we are making a verification function of 3 paramteres used to validation of user credentials got from clien
passport.use(new LocalStrategy(  async(USERNAME, password, done) => {
    //authentication logic here
    try{
        console.log('received credentials:', USERNAME, password); // Log the received credentials
        const user = await Person.findOne({ username: USERNAME }); // Find the user by username in the database
        if (!user) {
            console.log('User not found'); // Log if user is not found
            return done(null, false, { message: 'Incorrect username.' }); // Pass null for error, false for no user, and a message
        }
        const isPasswordValid = user.password === password ? true : false; // Check if the provided password matches the stored password
        if(isPasswordValid) {
            console.log('User authenticated successfully'); // Log successful authentication
            return done(null, user); // Pass null for error and the user object
        }
        else{
            return done(null, false, { message: 'Incorrect password.' }); // Pass null for error, false for no user, and a message
        }

    }catch(error) {
        console.error('Error during authentication:', error);
        return done(error); // Pass the error to the done callback
    }
}
))

const localAuthMiddleware = passport.authenticate('local', { session: false })

app.get('/', localAuthMiddleware, function(req, res) {
    res.send('Welcome to the Hotel Management System API');
});
//import the route files
const personRoutes = require('./Routes/personRoutes');
// use the route
app.use('/person',localAuthMiddleware, personRoutes); // Use the personRoutes for all routes starting with '/' which are for /person


// either in app.use line you use "/" or "/person" but if you use "/" then all the routes will be handled by personRoutes and if you use "/person" then only the routes starting with /person will be handled by personRoutes
// either in app.use line you use '/' or '/person' then if use '/' then add '/person' in the route file and if you use '/person' in server1.js then add '/' in the route file

//import the menuitemRoutes files
const menuitemRoutes = require('./Routes/menuitemRoutes');
const Person = require("./models/Person");
//use the route
app.use('/menu',localAuthMiddleware, menuitemRoutes); 
 

const PORT = process.env.PORT || 3000; // Use PORT from environment variables or if nothing iis there in .env then default to 3000
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});
/*
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
*/
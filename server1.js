const express = require("express");
const db = require("./db");
require('dotenv').config(); // Load environment variables from .env file
// const person = require("./models/person");

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//import the route files
const personRoutes = require('./Routes/personRoutes');
// use the route
app.use('/person', personRoutes); // Use the personRoutes for all routes starting with '/' which are for /person


// either in app.use line you use "/" or "/person" but if you use "/" then all the routes will be handled by personRoutes and if you use "/person" then only the routes starting with /person will be handled by personRoutes
// either in app.use line you use '/' or '/person' then if use '/' then add '/person' in the route file and if you use '/person' in server1.js then add '/' in the route file

//import the menuitemRoutes files
const menuitemRoutes = require('./Routes/menuitemRoutes');
//use the route
app.use('/menu', menuitemRoutes); 
 

const PORT = process.env.PORT || 3000; // Use PORT from environment variables or if nothing iis there in .env then default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
/*
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
*/
const express = require("express");
const db = require("./db");
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
 


app.listen(3000, () => {
    console.log('Listening on port 3000');
});
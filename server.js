//this is for importing a file from other files. in server only a single file is run others are imported as supporting files. here server.js is the main file 
// const notes = require('./notes.js')
// console.log("hi");

// var ag= notes.age;
//  var result = notes.addNumbers(ag+18, 3);

//  console.log(ag);
//  console.log(result);
// -----------------------------------------------------------------------------------------
/*

const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonObject = JSON. parse(jsonString); // Convert JSON string to object
console. log(jsonObject.name); // Output: John


const objectToConvert = { name: "Nice", age: 25};
const jsonStringified = JSON.stringify(objectToConvert); // Convert object JSON string
console.log(jsonStringified); // Output: {"name": "Alice" , "age" : 25}

*/
//-----------------------------------------------------------------------------------------------------

//making a server in nodejs using get method
/* how a client can req for a data to server? how will a client access the data ?
via web browser if you have a good UI, client will clck buttons or he will hit URLs where the data is stored. this url will contain our end points and once hit then the response from the serve will be seen on the display
now server dont know the language which client ask as a requesst so certain decided rules are  used using which data from server is demanded acc to the need use the method. there are diff methods to talk with server get is one of them
GET:
• Imagine you want to read a book on a library shelf. 
• You dont change anything, dont want to modify, delete add anything to the book or information.
• you just want to get the information. just want to read.
Similarly, the GET method is used to request data from the server.
For example, when you enter a website URL in your browser,
your browser sends a GET request to the server to fetch the web page. 
*/
/*
const express = require( 'express')
const app = express();
app.get( '/' , function (req, res) {
    res.send( 'Welcome to my hotel..How i can help you ?')
})
app.get('/chicken', (req,res)=>{
    res.send( 'sure sir, i would love to serve chicken')
})
app.get("/daal", (req, res)=>{
    res.send("sure sir, i would love to serve daal")
})
app.get('/bhatura', (req, res)=>{
    var customied_bhatura = {
        name: "bhatura",
        price: 100,
        taste: "spicy",
        chola : "yes"  
    }
    res.send(customied_bhatura);
})
//try searching localhost:3000/idli then it says cannot GET /idli bcoz it is not defined it is not in the menu.
app. listen( 3000, function () {
    console.log( 'Server is running on port 3000' )
})
-------------------------------------------------------------------------------------------------------------------------------------

how to coonect the server to the database? codes to be written here for server.js code
// 1. Import the required modules: You import the express module to create an Express.js server and the db module to connect to MongoDB.
// 2. Create an Express.js application: You create an instance of the Express application using express().
// 3. Define a route: You define a route for the root URL (/) that sends a welcome message when accessed.
// 4. Start the server: You start the server and listen on port 3000, logging a message to the console when the server is running.
// 5. The server will respond to requests made to the root URL (/) with a welcome message.
// 6. You can add more routes to handle different URLs and respond with different data.
// 7. The server will be running on http://localhost:3000, and you can access it using a web browser or a tool like Postman.
// 8. You can use this server to handle HTTP requests and interact with the MongoDB database using Mongoose.
// 9. You can add more routes to handle different URLs and respond with different data.


const express = require('express');
const app = express();
const db = require('./db');

app.get('/', function (req, res) {
    res.send('Welcome to my hotel... How can I help you? We have a list of menus.');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
}); */

/*--------------------------------------------------------------------------------------------------*/
const express = require('express'); //importing express module 
const db = require('./db'); //this will connect the db to the server
const person = require('./models/Person'); //we are importing the person model in server.js and with the help of this model we willdo all the operations in a dababase '
//now we will send the data to the database using post method from post man to db (we are sending a json file of a person) before which we need to define a post menthod in node.js
//before defining post method in server.js we need to define body parser(body parser notes are in lecnotes-06) after making this parser we make endpoint that sends data from clients to server. we need a endpoint f
// the post method to send data from client to server. this endpoint will be used by the client to send data to the server to storre in db  
//we need a method called POST 
//Now code the POST method to add the person 
//If we send the random values as well Mongoose will not save random values other than predefined schema 

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to my hotel... How can I help you? We have a list of menus.');
});

/*
//POST route to add a person
app.post('/person' , function (req, res){
    const data = req.body; //get the data from the request body, assuming the request body contains a JSON object with person details
    //create a new person documnet using the Person model
    const newPerson = new person({      //newPerson is a new instance of the person model, which is used to create a new document in the database
        name: data.name,  //newPerson = data.name;  
        age: data.age,
        work: data.work,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        salary: data.salary
    });   //OR  const newPerson = new person(data); //this will create a new person document using the data from the request body
            //or
            //const newPerson = new Person();
            // //newPerson.name = data.name; //this will create a new person document using the data from the request body. with the help of new personmodel all the data got inherited in newPerson
    
    //SAVE THE NEW PERSON DOCUMENT TO THE DATABASE.
    newPerson.save((error, savedPerson) => { //save method is used to save the new person document to the database
        if (error) { 
            console.log('Error saving person:', error); //if there is an error while saving the person document, log the error to the console
            res.status(500).json({error: 'internal server error'}); //if there is an error while saving the person document, send a 500 status code with the error message
        }else{
            console.log('Person saved successfully:'); //if the person document is saved successfully, log the saved person document to the console
            res.status(200).json(savedPerson); //if the person document is saved successfully, send a 201 status code with the saved person document as a JSON response
        }
    }) /* newPerson.save() is the main function
    It starts the operation to save the document to MongoDB.
    It's asynchronous, so it doesn’t immediately return the result.
    Instead, it expects a callback function to be provided. (error, savedPerson) => {
        This runs only AFTER the save operation is complete
    }
    The callback function receives two arguments: 
    1. error: If there was an error during the save operation, this will contain the error details.
    2. savedPerson: If the save operation was successful, this will contain the saved document.
    If there was an error, it logs the error and sends a 500 status code with an error message.
    If the save operation was successful, it logs the saved person document and sends a 200 status code with the saved person document as a JSON response.
    This function is called by Mongoose after the .save() finishes.
It does NOT perform the save itself.
It only handles the result:
If there’s an error → handle it.
If successful → respond with the saved data.
*/
//}) 

//using async-await for the POST method to add a person
// Example inside an Express route
app.post('/person', async (req, res) => {
    try{
        const data = req.body; // assuming req.body has person data

        //create a new person document using the Person model (moongoose model)
        const newPerson = new person(data); // this will create a new person document using the data from the request body
        //SAVE THE NEW PERSON DOCUMENT TO THE DATABASE.
        const response = await newPerson.save(); // this will save the new person document to the database
        console.log('Data saved', response);
        res.status(201).json(response); // send a 201 status code with the saved person document as a JSON response (or simply can write res.status().send() but since we are sending json data hence use .json())
    }  
    catch (error) {
        console.log(error);
        ///console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error'   }); 
      }
    });

app.get('/person', async (req, res) => {
    try {
        const data = await person.find(); // Fetch all persons from the database that requires time  
        res.status(200).json(data); // Send the list of persons as a JSON response
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//POST METHOD TO ADD MENU ITEMS
const menuItem = require('./hotelmenu'); // Importing the MenuItem model
app.post('/menu', async (req, res) => {
    try {
        const data = req.body; // assuming req.body has menu item data

        // Create a new menu item document using the MenuItem model
        const newMenuItem = new menuItem(data); // this will create a new menu item document using the data from the request body

        // SAVE THE NEW MENU ITEM DOCUMENT TO THE DATABASE.
        const response = await newMenuItem.save(); // this will save the new menu item document to the database
        console.log('Menu Item saved', response);
        res.status(201).json(response); // send a 201 status code with the saved menu item document as a JSON response
    } catch (error) {
        console.error('Error saving menu item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


})
//GET METHOD TO GET THE MENU ITEMS
app.get('/menu', async (req, res) => {
    try {
        const data = await menuItem.find(); // Fetch all menu items from the database
        res.status(200).json(data); // Send the list of menu items as a JSON response
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//PARAMETERISED CALL OF PERSON API
app.get('/person/:workType', async(req, res)=>{
    try {
        const workType = req.params.workType; // Get the work type send by the client to the URL assessed by get method  (/person/:workType) [defining the worktype in the URL]
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager') {  //validation statement
//already defined what can be worktype for sucerity purpose coz if not then if someone post dog or xyz then db operation willl be performed then enum error will be thrown that takes time so initially only we filter out the valid work types
        const data = await person.find({ work: workType }); // Fetch persons with the specified work type from the database | db operation is performed which takes time hence use await and async. | we used work bcoz in person schema we have defined work.
        console.log('response fetched');
        res.status(200).json(data); // Send the list of persons as a JSON response
        }else{
            res.status(400).json({ error: 'Invalid work type' }); // If the work type is not valid, send a 400 status code with an error message
        }
    } catch (error) {
        console.error('Error fetching persons by work type:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


app.listen(3000, () => {
    console.log('Listening on port 3000');
});
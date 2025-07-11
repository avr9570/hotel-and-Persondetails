/*to store the data in the database using post method we need to connect mongodb to nodejs server:
~Now, To connect MongoDB with NodeJS we need a MongoDB driver (a set of programs) 
~A MongoDB driver is essential when connecting Node.js with MongoDB because it acts as a bridge between your Node.js application server and the MongoDB database server
~MongoDB speaks its own language (protocol) to interact with the database server. 
~Node.js communicates in JavaScript to its server
~The driver translates the JavaScript code from Node.js into a format that MongoDB can understand and vice versa. 
~The driver provides a set of functions and methods that make it easier to perform common database operations from your Node.js code. 
~The driver helps you handle errors that might occur during database interactions. It provides error codes, descriptions, and other details to help you troubleshoot issues.
~The most popular driver is the official MongoDB Node.js driver, also known as the mongodb package. 
          npm install mongodb  (but we will not use it we will use mongoose)
Mongoose 
Now but we are going to use Mongoose, rather than mongodb 
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js 
I 
There are lots of reasons we prefer Mongoose rather than a native official driver 
Things are a lot easier here  There are lots of reasons we prefer Mongoose rather than a native official driver 
(Relate Real life Examples with mobiles with earphones) 
Mongoose is like a translator between your Node.js code and MongoDB. It makes working with the database smoother and easier. 
With Mongoose, you can define how your data should look, like making a blueprint for your documents. It's like saying, "In our database, each person's information will have a name, age, and email." This makes sure your data stays organized.

Mongoose helps you make sure the data you put into the database is correct. It's like having someone check if you've written your email address correctly before sending a message. 
Very easy to query from the database 
But if you are using mongodb Native Driver 
You need to write a lot of detailed instructions to make sure everything works correctly. 
Without Mongoose, your code might get messy and harder to understand. 
Since you need to handle many details yourself, it can take longer to finish your project. 
In a nutshell, using Mongoose makes working with MongoDB in Node.js much simpler and smoother. It gives you tools that handle complexities for you, so you can focus on building your application without getting bogged down in technical details.
*/

// in this file we will help to connect nodejs to mongodb server using moongoose library.
/*
DATABASE CONNECTION
Connect MongoDB with NodeJS
CREATE A FILE db . js IN THE ROOT FOLDER.
The db. j s file you've created is essentially responsible for establishing a
connection between your Node.js application and your MongoDB database
using the Mongoose library.
In the Last Lecture, we saw that the mongoose is responsible for
connection
So let's import Mongoose Library
*/
/* 
• Connection Step by Step
I. Import Mongoose and Define the MongoDB URL: In the db. js file, you
first import the Mongoose library and define the URL to your MongoDB
database. This URL typically follows the format
"mongodb : //<hostname> : <port>/<databaseName>" In your code,
youwe set the URL to  "mongodb : / / localhost :27017/mydatabase" ,
where 'mydatabase' is the name of your MongoDB database that you want to give.
2. Set Up the MongoDB Connection: Next, you call 'mongoose. connect()' to establish a connection to the MongoDB database using the URL and some configuration options (useNewUrlParser, useUnifiedTop010gy,
etc.). This step initializes the cdnnection process but does not actually
connect at this point
3. Access the Default Connection Object: Mongoose maintains a default connection object representing the MongoDB connection. You retrieve this
object using 'mongoose. connection', and you've stored it in the variable 'db'. This object is what you will use to handle events and interacts with the database.
4. Define Event Listeners: they listen the task done by db object. You define event listeners for the database
connection using methods like .on('connected',. . .) , .on('error', . . .),
and .on( 'disconnected'. . .) These event listeners allow you(client) to react to different states of the database connection. they can log different type of messages to the console, send an email, or take other actions based on the event that occurs.
5. Start Listening for Events: The code is set up to listen for events. When you call mongoose. connect() , Mongoose starts the connection process.
If the connection is successful, the ' connected ' event is triggered, and
you log a message indicating that you're connected to MongoDB. If there's
an error during the connection process, the error event is triggered,
and you log an error message. Similarly, the ' disconnected ' event can
be useful for handling situations where the connection is lost.
6. Export the Database Connection: Finally, you export the db object, which
represents the MongoDB connection, so that you can import and use it in
other parts of your Node.js application.*/
 //moongoose maintain this db object so that it get connected to db server to node, whn you run file db obj gets created i .e responsible for connection. when the connection is done it will log the message to console because event listner ne sun liya connected.
 /* 
 To sum it up, the db. js file acts as a central module that manages the
connection to your MongoDB database and nodejs using Mongoose. It sets up the
connection, handles connection events, and exports the connection object so that 
your Express.is server (or other parts of your application) can use it to
interact with the database. When your server runs, it typically requires or
imports this db. j s file to establish the database connection before
handling HTTP requests. if you shut down db server, it will log the message to console that it is disconnected as db will not be able to connect to express server
*/

const mongoose = require("mongoose");
require('dotenv').config();
// Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; // Replace 'mydatabase' with your database name

//remote database hosting
//const mongoURL = 'mongodb+srv://atharvaraut9570:Atharva@cluster0.oty2xel.mongodb.net/'
//const mongoURL = process.env.mongo_URL; 
// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get the default connection that helps it(moongoosse) to interact and connect with db server
// Mongoose maintains a default connection 'object' representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected!');
});

// Export the database connection object
module.exports = db;
/*
-------------------------------------------------------------------------------------------------------------------------------------
what are models or schema?
@ Models are like a blueprint of our database. this blueprint can be made with the help of mongoose.
to store the data in the database we need to create a model/schema of the data, using moongoose we want to store:
{ 
"name": "Alice", 
"age": 
"work": "Chef", 
"mobile": "123-456-7890", 
"email": "alice@example.com", 
"address": "123 Main St, City", 
"salary": 68000 
}
@ It's a representation of a specific collection in MongoDB. Like a Person
@ Once you have defined a model, you can create. read, update, and delete
documents in the corresponding MongoDB collection.
@ Mongoose allows you to define a schema for your documents. A schema is
like a blueprint that defines the structure and data types of your documents
within a collection.
@ each person's details (like chef, owner, manager, waiter, etc.) can be stored 
@ we before making a db we make blueprint(format)
@ to make blueprint first we maintain a folder called models. in that we make a file which will have blueprint(person.js)*/

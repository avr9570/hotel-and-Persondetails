const express = require("express");
const router = express.Router(); //manages routes i.e different different end points

const person = require('./../models/Person');
//route to handle POST request to create a new person
router.post('/', async (req, res) => {
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
//GET route to fetch all persons details
router.get('/', async (req, res) => {
    try {
        const data = await person.find(); // Find all persons in the database
        console.log('data fetched');
        res.status(200).json(data); // Send the persons as a JSON response
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//get method to get persons filtered on the basis of work
router.get('/:workType', async(req, res)=>{
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
router.put("/:id", async (req, res) => {   
    try{
        const personId = req.params.id; 
        const updatedPersonData = req.body; 
        
        const response = await person.findByIdAndUpdate(personId, updatedPersonData, { 
            new: true,  // Find the person by ID and update it with the new data. The { new: true } option returns the updated document.
            runValidators: true, // This option ensures that the update operation runs the validation defined in the schema.
        })

        if(!response){ // If no person is found with the given ID, return a 404 status code.
            return res.status(404).json({error: 'person not found'});
        }
        console.log('Person updated', response);
    }catch(error){
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        // Assuming you have a Person model
        const response = await person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({ message: 'person Deleted Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
// Export the router to use in the main server file

module.exports = router;
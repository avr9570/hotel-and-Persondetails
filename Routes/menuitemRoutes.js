const express = require("express");
const router = express.Router(); 

const MenuItem = require('./../models/menuitem');
//post method to create a new menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body; // assuming req.body has menu item data

        // Create a new menu item document using the MenuItem model
        const newMenuItem = new MenuItem(data); // this will create a new menu item document using the data from the request body

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
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find(); // Fetch all menu items from the database
        res.status(200).json(data); // Send the list of menu items as a JSON response
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
router.get("/:taste", async (req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste == 'spicy' || taste == 'sweet' || taste == 'sour'){
            const data = await MenuItem.find({ taste});
            console.log("responsefetched");
            res.status(200).json(data);
        }
        else {
            res.status(400).json({error: "invalid taste"});
        }
    }catch(error){
        console.error('error fetching menu by taste', error);
        res.status(500).json({error: 'internal server error'});
    }
})
module.exports = router;
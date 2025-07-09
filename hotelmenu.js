const mongoose = require("mongoose");
const menuItemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true },
    price: { 
        type: Number, 
        required: true },
    taste: { 
        type: String, 
        enum: ['spicy', 'sweet', 'sour'], // Enum to restrict taste value
        required: true },
    is_drink: { 
        type: Boolean, 
        default: false }, // Default value for is_drink if person does not fill it
    ingredients: { 
        type: [String], 
        required: true }, // Array of ingredients
    num_sales: { 
        type: Number, 
        default: 0 }, // Default value for num_sales if person does not fill it
})
// Create a model based on the schema
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
// Export the MenuItem model so that it can be used in other parts of the application
module.exports = MenuItem;

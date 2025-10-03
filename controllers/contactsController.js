// contactsController.js
// This file has the logic for handling requests to the "contacts" collection

// Import ObjectId from MongoDB to query documents by ID
const { ObjectId } = require('mongodb');

// Get all contacts from the database
const getAllContacts = async (req, res) => {
    try {
        // Fetch all documents in the 'contacts' collection
        const results = await req.db.collection('contacts').find().toArray();
        res.status(200).json(results);
    } catch (err) {
        // If an error occurs, return a 500 response with error info
        res.status(500).json({ message: 'Error getting contacts', error: err });
    }   
};

// Get a single contact by its ObjectId
const getSingleContact = async (req, res) => {
    try {
        const id = req.params.id; // Get ID from URL parameter
        const result = await req.db.collection('contacts').findOne({ _id: new ObjectId(id) });

        if (!result) {
            // If no document matches, send a 404
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Send the found document
        res.status(200).json(result);
    } catch (err) {
        // If an error occurs (invalid ObjectId or DB issue), send 500
        res.status(500).json({ message: 'Error getting contact', error: err });
    }
};

// Export the controller functions to use in routes
module.exports = {
    getAllContacts,
    getSingleContact
};


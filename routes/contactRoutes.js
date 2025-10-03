// contactRoutes.js
// Routes for handling HTTP requests related to contacts

const express = require('express');
const router = express.Router();

// Import controller functions
const contactsController = require('../controllers/contactsController');

// Route to get all contacts
router.get('/', contactsController.getAllContacts);

// Route to get a single contact by ID
router.get('/:id', contactsController.getSingleContact);

module.exports = router;
// End of contactRoutes.js
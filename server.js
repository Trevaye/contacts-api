// server.js
// Entry point for the Node.js API server

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const { MongoClient } = require('mongodb');
const contactRoutes = require('./routes/contactRoutes'); // Import routes

const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

let db;

// Connect to MongoDB
MongoClient.connect(process.env.MONGODB_URI)
    .then(client => {
        console.log('Connected to MongoDB');

        db = client.db(); // Use the database specified in your URI
        app.locals.db = db; // Make db accessible in app.locals

        // Middleware to attach db to every request
        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // Mount routes at /contacts
        app.use('/contacts', contactRoutes);

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));

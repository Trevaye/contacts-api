// routes/contactRoutes.js
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await req.db.collection('contacts').find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET one contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await req.db
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID' });
  }
});

module.exports = router;

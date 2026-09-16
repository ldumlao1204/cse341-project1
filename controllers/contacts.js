const mongodb = require('../db/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const contacts = await mongodb.getDatabase().collection('contacts').find().toArray();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving contacts.' });
    }
};

const getSingle = async (req, res) => {
    try {
        const contact = await mongodb
            .getDatabase()
            .collection('contacts')
            .findOne({ _id: new ObjectId(req.params.id) });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found.' });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ error: 'Invalid contact ID.' });
    }
};

const createContact = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !favoriteColor ||
            !birthday
        ) {
            return res.status(400).json({
                error: 'All contact fields are required.'
            });
        }

        const newContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const result = await mongodb
            .getDatabase()
            .collection('contacts')
            .insertOne(newContact);

        res.status(201).json({
            id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while creating the contact.'
        });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !favoriteColor ||
            !birthday
        ) {
            return res.status(400).json({
                error: 'All contact fields are required.'
            });
        }

        const updatedContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const result = await mongodb
            .getDatabase()
            .collection('contacts')
            .updateOne(
                { _id: new ObjectId(contactId) },
                { $set: updatedContact }
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Contact not found.'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({
            error: 'Invalid contact ID or update data.'
        });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;

        const result = await mongodb
            .getDatabase()
            .collection('contacts')
            .deleteOne({
                _id: new ObjectId(contactId)
            });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'Contact not found.'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({
            error: 'Invalid contact ID.'
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
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

module.exports = {
    getAll,
    getSingle
};
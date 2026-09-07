const router = require('express').Router();
const mongodb = require('../db/database');

router.get('/', async (req, res) => {
    try {
        const database = mongodb.getDatabase();
        const contacts = await database.collection('contacts').find().toArray();

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while retrieving contacts.'
        });
    }
});

module.exports = router;
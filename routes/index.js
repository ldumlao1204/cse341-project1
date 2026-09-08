const router = require('express').Router(); //allow us to handle routing in this file

router.get('/', (req, res) => {res.send('Hello World');});

router.use('/contacts', require('./contacts')); //this will route to the contacts.js file

module.exports = router;
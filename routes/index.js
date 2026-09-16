const router = require('express').Router(); //allow us to handle routing in this file

router.use('/', require('./swagger')); //this will route to the swagger.js file

router.get('/', (req, res) => {//#swagger.tags=[Hello World']
    res.send('Hello World');
});

router.use('/contacts', require('./contacts')); //this will route to the contacts.js file

module.exports = router;
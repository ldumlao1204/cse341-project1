const router = require('express').Router(); //allow us to handle routing in this file

router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;
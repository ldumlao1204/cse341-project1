const express = require('express');
const router = require('express').Router();

const contactsController = require('../controllers/contacts');

const mongodb = require('../db/database');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

module.exports = router;
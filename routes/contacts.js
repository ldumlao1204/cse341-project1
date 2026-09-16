const express = require('express');
const router = require('express').Router();

const contactsController = require('../controllers/contacts');

const mongodb = require('../db/database');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact)

router.delete('/:id', contactsController.deleteContact)

module.exports = router;
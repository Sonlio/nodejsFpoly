const express = require('express');
const controllerRegister = require('../controller/controllerRegister');
const auth = require('../middleware/auth');
const validate = require('../middleware/user.input');

const router = express.Router();

router.post('/register', validate.require, controllerRegister.createUser);
router.post('/login', controllerRegister.login);
router.get('/private', auth.authenticate, controllerRegister.testAuth);

module.exports = router;
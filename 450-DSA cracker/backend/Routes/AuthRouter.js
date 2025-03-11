const { signup, login } = require('../Controllers/AuthController');
const { signupValidaton, loginValidaton } = require('../Middleware/AuthValidation');

const router = require('express').Router();

router.post('/', signupValidaton, signup);
router.post('/login', loginValidaton, login);

module.exports = router;
const { Router } = require("express");
const authController = require('../controllers/authController');

const router = Router();

//register new user with email & password
router.post('/register', authController.register)

//registered user login
router.post('/login', authController.login)

module.exports = router;
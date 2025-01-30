const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

// Rutas de autenticación
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/verify', verifyToken, authController.verifyTokenStatus);


module.exports = router;
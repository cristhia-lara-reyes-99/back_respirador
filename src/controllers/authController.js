
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authController = {
    // Registro
    register: async (req, res) => {
        try {
            const { username, full_name, last_name, age, email, password } = req.body;

            // Verificar si el usuario ya existe
            const existingUsers = await userModel.findByUsernameOrEmail(username, email);

            if (existingUsers.length > 0) {
                return res.status(400).json({ 
                    message: "El usuario o correo ya está registrado" 
                });
            }

            // Crear nuevo usuario
            const userId = await userModel.create(req.body);

            res.status(201).json({ 
                message: "Usuario registrado exitosamente",
                userId: userId 
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    },
    // Login
    login: async (req, res) => {
        const startTime = process.hrtime();
        try {
            const { username, password } = req.body;

            // Validaciones básicas
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos incompletos',
                    error: 'El usuario y la contraseña son obligatorios'
                });
            }

            // Buscar usuario
            const user = await userModel.findByUsername(username);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas',
                    error: 'Usuario o contraseña incorrectos'
                });
            }

            // Verificar contraseña
            const validPassword = await userModel.verifyPassword(password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas',
                    error: 'Usuario o contraseña incorrectos'
                });
            }

            // Generar token
            const token = jwt.sign(
                { 
                    id: user.id, 
                    username: user.username 
                },
                process.env.JWT_SECRET,
                { expiresIn: '12h' }
            );

            const endTime = process.hrtime(startTime);
            const responseTime = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);

            res.json({
                success: true,
                tiempoRespuesta: `${responseTime}ms`,
                token,
                usuario: {
                    id: user.id,
                    username: user.username,
                    full_name: user.full_name,
                    email: user.email
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Error en el servidor',
                error: error.message
            });
        }
    },
    // Verificar token
    verifyTokenStatus: async (req, res) => {
        try {
            // Como el middleware verifyToken ya validó el token, 
            // solo necesitamos devolver la información del usuario
            res.json({
                success: true,
                message: 'Token válido',
                usuario: {
                    id: req.user.id,
                    username: req.user.username
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Error en el servidor',
                error: error.message
            });
        }
    }
};

// Exportamos el controlador de autenticación
module.exports = authController;
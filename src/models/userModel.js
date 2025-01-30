const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const userModel = {
    // Buscar usuario por username o email
    findByUsernameOrEmail: async (username, email) => {
        const [users] = await pool.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        return users;
    },

    // Buscar usuario por username
    findByUsername: async (username) => {
        const [users] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        return users[0];
    },

    // Crear nuevo usuario
    create: async (userData) => {
        const { username, full_name, last_name, age, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await pool.query(
            'INSERT INTO users (username, full_name, last_name, age, email, password) VALUES (?, ?, ?, ?, ?, ?)',
            [username, full_name, last_name, age, email, hashedPassword]
        );
        
        return result.insertId;
    },

    // Verificar contraseña
    verifyPassword: async (plainPassword, hashedPassword) => {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
};

module.exports = userModel;

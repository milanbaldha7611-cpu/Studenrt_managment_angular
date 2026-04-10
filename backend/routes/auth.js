const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Register (student)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create User record
    await query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'student']
    );

    // Create basic Student record
    const names = name.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ') || 'Student';
    
    await query(
      'INSERT INTO students (first_name, last_name, email) VALUES (?, ?, ?)',
      [firstName, lastName, email]
    );

    const [user] = await query('SELECT id, name, email, role FROM users WHERE email = ?', [email]);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
    res.status(201).json({ message: 'Registered successfully.', token, user });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already registered.' });
    }
    res.status(500).json({ message: err.message });
  }
});

// Login (student or admin)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const [user] = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
    res.json({
      message: 'Login successful.',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const [user] = await query(
      'SELECT id, name, email, role FROM users WHERE id = ?',
      [req.user.id]
    );
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

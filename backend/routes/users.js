const express = require('express');
const bcrypt = require('bcrypt');
const { query } = require('../config/db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();
router.use(auth, adminAuth);

// GET all users (paginated + search)
router.get('/', async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').trim();

    let where = '';
    const params = [];
    if (search) {
      where = 'WHERE name LIKE ? OR email LIKE ? OR role LIKE ?';
      const t = `%${search}%`;
      params.push(t, t, t);
    }

    const countResult = await query(`SELECT COUNT(*) as total FROM users ${where}`, params);
    const total = countResult[0].total;

    params.push(limit, offset);
    const users = await query(
      `SELECT id, name, email, role, created_at FROM users ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      params
    );

    res.json({ users, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single user
router.get('/:id', async (req, res) => {
  try {
    const users = await query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.params.id]);
    if (!users.length) return res.status(404).json({ message: 'User not found.' });
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create user (admin can create any role)
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }
    const validRoles = ['admin', 'student'];
    const userRole = validRoles.includes(role) ? role : 'student';
    const hashed = await bcrypt.hash(password, 10);
    await query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, userRole]
    );
    const created = await query('SELECT id, name, email, role, created_at FROM users WHERE email = ?', [email]);
    res.status(201).json(created[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Email already registered.' });
    res.status(500).json({ message: err.message });
  }
});

// PATCH update role
router.patch('/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['admin', 'student'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be admin or student.' });
    }
    // Prevent admin from demoting themselves
    if (parseInt(req.params.id) === req.user.id && role !== 'admin') {
      return res.status(400).json({ message: 'You cannot change your own role.' });
    }
    const result = await query('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found.' });
    res.json({ message: `Role updated to ${role}.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    // Prevent self-deletion
    if (parseInt(req.params.id) === req.user.id) {
      return res.status(400).json({ message: 'You cannot delete your own account.' });
    }
    const result = await query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found.' });
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

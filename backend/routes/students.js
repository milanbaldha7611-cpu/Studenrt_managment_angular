const express = require('express');
const { query } = require('../config/db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// All student routes require auth; add/edit/delete require admin
router.use(auth);

// Get all students (with pagination and search) - admin
router.get('/', adminAuth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').trim();

    let whereClause = '';
    const params = [];
    if (search) {
      whereClause = 'WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR course LIKE ?';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    const [countResult] = await query(
      `SELECT COUNT(*) as total FROM students ${whereClause}`,
      params
    );
    const total = countResult.total;

    params.push(limit, offset);
    const students = await query(
      `SELECT * FROM students ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      params
    );

    res.json({
      students,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user's student record (student role only) - must be before /:id
router.get('/me/record', async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can access their record.' });
    }
    const [student] = await query('SELECT * FROM students WHERE email = ?', [req.user.email]);
    if (!student) return res.status(404).json({ message: 'No student record linked to your account.' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get student by email (for linking user to student record)
router.get('/by-email/:email', adminAuth, async (req, res) => {
  try {
    const [student] = await query('SELECT * FROM students WHERE email = ?', [req.params.email]);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single student - admin or student (own profile via student record)
router.get('/:id', async (req, res) => {
  try {
    const [student] = await query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    if (req.user.role === 'student') {
      const [link] = await query('SELECT id FROM students WHERE email = ?', [req.user.email]);
      if (!link || link.id !== parseInt(req.params.id)) {
        return res.status(403).json({ message: 'Access denied.' });
      }
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add student - admin only
router.post('/', adminAuth, async (req, res) => {
  try {
    const { first_name, last_name, email, phone, course, gender, college_name, university_name } = req.body;
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ message: 'First name, last name and email are required.' });
    }
    await query(
      'INSERT INTO students (first_name, last_name, email, phone, course, gender, college_name, university_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone || null, course || null, gender || null, college_name || null, university_name || null]
    );
    const [created] = await query('SELECT * FROM students WHERE email = ?', [email]);
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    res.status(500).json({ message: err.message });
  }
});

// Update student - admin only
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { first_name, last_name, email, phone, course, gender, college_name, university_name } = req.body;
    const [existing] = await query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ message: 'Student not found.' });
    await query(
      'UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ?, course = ?, gender = ?, college_name = ?, university_name = ? WHERE id = ?',
      [
        first_name ?? existing.first_name,
        last_name ?? existing.last_name,
        email ?? existing.email,
        phone !== undefined ? phone : existing.phone,
        course !== undefined ? course : existing.course,
        gender !== undefined ? gender : existing.gender,
        college_name !== undefined ? college_name : existing.college_name,
        university_name !== undefined ? university_name : existing.university_name,
        req.params.id,
      ]
    );
    const [updated] = await query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    res.json(updated);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    res.status(500).json({ message: err.message });
  }
});

// Delete student - admin only
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    // First fetch the student so we know their email
    const student = await query('SELECT email FROM students WHERE id = ?', [req.params.id]);
    if (!student || student.length === 0) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    const studentEmail = student[0].email;

    // Delete from students table
    const result = await query('DELETE FROM students WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found.' });

    // Also delete the linked user account so the email is freed for re-registration
    await query('DELETE FROM users WHERE email = ? AND role = ?', [studentEmail, 'student']);

    res.json({ message: 'Student and linked account deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

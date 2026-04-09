const express = require('express');
const { query } = require('../config/db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

// Get all attendance records (with pagination and date filter) - admin
router.get('/', adminAuth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;
    const dateFilter = req.query.date || '';

    let whereClause = '';
    const params = [];
    if (dateFilter) {
      whereClause = 'WHERE a.date = ?';
      params.push(dateFilter);
    }

    const countSql = `SELECT COUNT(*) as total FROM attendance a ${whereClause}`;
    const [countResult] = await query(countSql, params);
    const total = countResult.total;

    params.push(limit, offset);
    const records = await query(
      `SELECT a.*, s.first_name, s.last_name, s.email, s.course 
       FROM attendance a 
       JOIN students s ON a.student_id = s.id 
       ${whereClause} 
       ORDER BY a.date DESC, s.last_name ASC 
       LIMIT ? OFFSET ?`,
      params
    );

    res.json({
      attendance: records,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get students present on a specific date - admin
router.get('/present-on-date', adminAuth, async (req, res) => {
  try {
    const date = req.query.date;
    if (!date) {
      return res.status(400).json({ message: 'Date query parameter is required.' });
    }
    const list = await query(
      `SELECT a.*, s.first_name, s.last_name, s.email, s.course 
       FROM attendance a 
       JOIN students s ON a.student_id = s.id 
       WHERE a.date = ? AND a.status = 'Present' 
       ORDER BY s.last_name`,
      [date]
    );
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get attendance for a specific student (history) - admin or student (own)
router.get('/student/:studentId', async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);
    if (req.user.role === 'student') {
      const [student] = await query('SELECT id FROM students WHERE email = ?', [req.user.email]);
      if (!student || student.id !== studentId) {
        return res.status(403).json({ message: 'Access denied.' });
      }
    }
    const records = await query(
      'SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC',
      [studentId]
    );
    const [student] = await query('SELECT first_name, last_name FROM students WHERE id = ?', [studentId]);
    const present = records.filter((r) => r.status === 'Present').length;
    const total = records.length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    res.json({
      student: student || null,
      attendance: records,
      summary: { total, present, absent: total - present, percentage },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark attendance (single or bulk) - admin only
router.post('/', adminAuth, async (req, res) => {
  try {
    const { student_id, date, status } = req.body;
    const bulk = req.body.bulk;
    if (bulk && Array.isArray(bulk)) {
      for (const row of bulk) {
        await query(
          'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status)',
          [row.student_id, row.date, row.status || 'Present']
        );
      }
      return res.status(201).json({ message: 'Attendance marked successfully.' });
    }
    if (!student_id || !date || !status) {
      return res.status(400).json({ message: 'student_id, date and status are required.' });
    }
    await query(
      'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status)',
      [student_id, date, status]
    );
    const [created] = await query(
      'SELECT a.*, s.first_name, s.last_name FROM attendance a JOIN students s ON a.student_id = s.id WHERE a.student_id = ? AND a.date = ?',
      [student_id, date]
    );
    res.status(201).json(created || { student_id, date, status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update single attendance record - admin only
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['Present', 'Absent'].includes(status)) {
      return res.status(400).json({ message: 'Valid status (Present/Absent) is required.' });
    }
    await query('UPDATE attendance SET status = ? WHERE id = ?', [status, req.params.id]);
    const [updated] = await query('SELECT * FROM attendance WHERE id = ?', [req.params.id]);
    if (!updated) return res.status(404).json({ message: 'Record not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete attendance record - admin only
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const [result] = await query('DELETE FROM attendance WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Record not found.' });
    res.json({ message: 'Attendance record deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

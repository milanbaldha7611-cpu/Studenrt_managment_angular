const express = require('express');
const { query } = require('../config/db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

// Admin dashboard stats
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const [studentsCount] = await query('SELECT COUNT(*) as count FROM students');
    const [attendanceCount] = await query('SELECT COUNT(*) as count FROM attendance');
    res.json({
      totalStudents: studentsCount.count,
      totalAttendanceRecords: attendanceCount.count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

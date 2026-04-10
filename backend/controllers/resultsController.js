const db = require('../config/db');

exports.getAllResults = async (req, res) => {
  try {
    const rows = await db.query(`
      SELECT r.*, s.first_name, s.last_name, s.course 
      FROM results r 
      JOIN students s ON r.student_id = s.id 
      ORDER BY r.id DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all results', error: err.message });
  }
};

exports.getResultsByStudent = async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const rows = await db.query(
      'SELECT * FROM results WHERE student_id = ? ORDER BY semester DESC, exam_name ASC', 
      [studentId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching results', error: err.message });
  }
};

exports.addResult = async (req, res) => {
  const { student_id, exam_name, subject, semester, marks_obtained, max_marks } = req.body;
  if (!student_id || !exam_name || !subject || marks_obtained === undefined || max_marks === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const sId = parseInt(student_id);
    const mObtained = parseFloat(marks_obtained);
    const mMax = parseFloat(max_marks);

    const result = await db.query(
      'INSERT INTO results (student_id, exam_name, subject, semester, marks_obtained, max_marks) VALUES (?, ?, ?, ?, ?, ?)',
      [sId, exam_name, subject, semester, mObtained, mMax]
    );
    res.status(201).json({ 
      id: result.insertId, 
      student_id: sId, 
      exam_name, 
      subject, 
      semester, 
      marks_obtained: mObtained, 
      max_marks: mMax 
    });
  } catch (err) {
    console.error('SQL Error in addResult:', err.message);
    res.status(500).json({ message: 'Internal Server Error (Database)', error: err.message });
  }
};

exports.deleteResult = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM results WHERE id = ?', [id]);
    res.json({ message: 'Result deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting result', error: err.message });
  }
};
exports.updateResult = async (req, res) => {
  const { id } = req.params;
  const { exam_name, subject, semester, marks_obtained, max_marks } = req.body;
  try {
    await db.query(
      'UPDATE results SET exam_name = ?, subject = ?, semester = ?, marks_obtained = ?, max_marks = ? WHERE id = ?',
      [exam_name, subject, semester, parseFloat(marks_obtained), parseFloat(max_marks), id]
    );
    res.json({ message: 'Result updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating result', error: err.message });
  }
};

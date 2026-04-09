const bcrypt = require('bcrypt');
const { query } = require('./db');

async function seed() {
  try {
    const adminPassword = await bcrypt.hash('admin123', 10);
    await query(
      "INSERT IGNORE INTO users (name, email, password, role) VALUES ('Admin', 'admin@school.com', ?, 'admin')",
      [adminPassword]
    );

    const studentPassword = await bcrypt.hash('student123', 10);
    const students = [
      ['John', 'Doe', 'john.doe@student.com', '9876543210', 'Computer Science'],
      ['Jane', 'Smith', 'jane.smith@student.com', '9876543211', 'Mathematics'],
      ['Bob', 'Wilson', 'bob.wilson@student.com', '9876543212', 'Physics'],
    ];
    for (const [fn, ln, email, phone, course] of students) {
      await query(
        'INSERT IGNORE INTO students (first_name, last_name, email, phone, course) VALUES (?, ?, ?, ?, ?)',
        [fn, ln, email, phone, course]
      );
      await query(
        'INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [`${fn} ${ln}`, email, studentPassword, 'student']
      );
    }

    const studentRows = await query('SELECT id FROM students ORDER BY id LIMIT 3');
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    for (const { id } of studentRows) {
      await query(
        'INSERT IGNORE INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
        [id, today, 'Present']
      );
      await query(
        'INSERT IGNORE INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
        [id, yesterday, id % 2 === 0 ? 'Present' : 'Absent']
      );
    }

    console.log('Seed data inserted. Admin: admin@school.com / admin123. Student: john.doe@student.com / student123');
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

seed();

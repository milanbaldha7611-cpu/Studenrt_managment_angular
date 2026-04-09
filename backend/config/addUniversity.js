const mysql = require('mysql2');
require('dotenv').config({ path: '../.env' });

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'student_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.query(`
  ALTER TABLE students
  ADD COLUMN university_name VARCHAR(255) NULL
`, (err, results) => {
    if (err && err.code !== 'ER_DUP_FIELDNAME') {
        console.error('Error adding university_name column:', err.message);
    } else {
        console.log('Successfully added university_name column to students table');
    }
    process.exit();
});

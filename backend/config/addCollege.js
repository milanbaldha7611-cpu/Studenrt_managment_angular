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
  ADD COLUMN college_name VARCHAR(255) NULL
`, (err, results) => {
    if (err) {
        console.error('Error adding college_name column:', err.message);
    } else {
        console.log('Successfully added college_name column to students table');
    }
    process.exit();
});

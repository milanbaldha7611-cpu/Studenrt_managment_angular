const db = require('./backend/config/db');

async function migrate() {
  console.log('Migrating database schema...');
  try {
    await db.query('ALTER TABLE students ADD COLUMN enrollment_no VARCHAR(50) UNIQUE AFTER email');
    console.log('SUCCESS: Added enrollment_no column to students table.');
    process.exit(0);
  } catch (err) {
    if (err.message.includes('Duplicate column name')) {
      console.log('INFO: enrollment_no column already exists.');
      process.exit(0);
    }
    console.error('ERROR MIGRATING:', err.message);
    process.exit(1);
  }
}

migrate();

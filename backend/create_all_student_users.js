const db = require('./config/db');
const bcrypt = require('bcrypt');

async function createAllstudentUsers() {
  console.log('Generating login accounts for ALL students in the database...');
  const defaultPassword = 'student123';

  try {
    const students = await db.query('SELECT first_name, email FROM students');
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    for (const s of students) {
      // Check if user already exists
      const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [s.email]);
      
      if (!existing) {
        await db.query(
          'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
          [s.first_name, s.email, hashedPassword, 'student']
        );
        console.log(`Created account: ${s.email}`);
      }
    }

    console.log('\n-----------------------------------');
    console.log('STUDENT LOGIN SUMMARY:');
    console.log(`Password (for all): ${defaultPassword}`);
    console.log('Recently added student emails:');
    students.slice(-5).forEach(s => console.log(`- ${s.email}`));
    console.log('... and more.');
    console.log('-----------------------------------');
    
    process.exit(0);
  } catch (err) {
    console.error('ERROR CREATING USERS:', err.message);
    process.exit(1);
  }
}

createAllstudentUsers();

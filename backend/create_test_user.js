const db = require('./config/db');
const bcrypt = require('bcrypt');

async function createTestUser() {
  const email = 'rahul@gmail.com';
  const name = 'Rahul Sharma';
  const password = 'student123';

  console.log(`Creating test user account for ${email}...`);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if user exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) {
      await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
      console.log('User already existed, updated password.');
    } else {
      await db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, 'student']
      );
      console.log('New user created successfully.');
    }

    console.log('-----------------------------------');
    console.log('LOGIN CREDENTIALS:');
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log('-----------------------------------');
    
    process.exit(0);
  } catch (err) {
    console.error('ERROR CREATING USER:', err.message);
    process.exit(1);
  }
}

createTestUser();

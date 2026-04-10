const db = require('./config/db');
const bcrypt = require('bcrypt');

async function createAdmin() {
  const email = 'admin@gmail.com';
  const name = 'System Admin';
  const password = 'admin123';

  console.log(`Ensuring Admin account for ${email}...`);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if user exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) {
      await db.query('UPDATE users SET password = ?, role = ? WHERE email = ?', [hashedPassword, 'admin', email]);
      console.log('Admin already existed, updated password/role.');
    } else {
      await db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, 'admin']
      );
      console.log('Admin user created successfully.');
    }

    console.log('-----------------------------------');
    console.log('ADMIN LOGIN CREDENTIALS:');
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log('-----------------------------------');
    
    process.exit(0);
  } catch (err) {
    console.error('ERROR CREATING ADMIN:', err.message);
    process.exit(1);
  }
}

createAdmin();

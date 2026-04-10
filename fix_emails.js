const db = require('./backend/config/db');

async function updateEmails() {
  console.log('Simplifying student emails to firstname@gmail.com...');

  try {
    const students = await db.query('SELECT id, first_name FROM students');
    
    for (const student of students) {
      const simplifiedEmail = `${student.first_name.trim().toLowerCase()}@gmail.com`;
      
      await db.query('UPDATE students SET email = ? WHERE id = ?', [simplifiedEmail, student.id]);
      console.log(`Updated ID ${student.id} -> ${simplifiedEmail}`);
    }

    console.log('SUCCESS: Email update complete.');
    process.exit(0);
  } catch (err) {
    if (err.message.includes('Duplicate entry')) {
       console.error('ERROR: Duplicate email detected. Using unique IDs instead...');
       // Fallback for duplicates
       const students = await db.query('SELECT id, first_name FROM students');
       for (const student of students) {
         const uniqueEmail = `${student.first_name.trim().toLowerCase()}${student.id}@gmail.com`;
         await db.query('UPDATE students SET email = ? WHERE id = ?', [uniqueEmail, student.id]);
       }
       console.log('SUCCESS: Email update complete with unique IDs.');
       process.exit(0);
    }
    console.error('ERROR UPDATING EMAILS:', err.message);
    process.exit(1);
  }
}

updateEmails();

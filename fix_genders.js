const db = require('./backend/config/db');

async function updateGenders() {
  console.log('Synchronizing genders with names...');

  const maleNames = ['Aarav', 'Deepak', 'Ishaan', 'Pranav', 'Rohan', 'Vivan', 'Yash', 'Rahul', 'Suresh', 'Jenishh', 'Rishbh', 'Rohit', 'Aniket', 'M Milan'];
  const femaleNames = ['Kavya', 'Meera', 'Neha', 'Sanya', 'Tanvi', 'Zoya', 'Anjali', 'Radhika', 'Kumari'];

  try {
    const students = await db.query('SELECT id, first_name FROM students');
    
    for (const student of students) {
      let gender = 'Other';
      const name = student.first_name.trim();

      if (maleNames.some(m => name.toLowerCase().includes(m.toLowerCase()))) {
        gender = 'Male';
      } else if (femaleNames.some(f => name.toLowerCase().includes(f.toLowerCase()))) {
        gender = 'Female';
      }

      await db.query('UPDATE students SET gender = ? WHERE id = ?', [gender, student.id]);
      console.log(`Updated ${name} -> ${gender}`);
    }

    console.log('SUCCESS: Gender synchronization complete.');
    process.exit(0);
  } catch (err) {
    console.error('ERROR UPDATING GENDERS:', err.message);
    process.exit(1);
  }
}

updateGenders();

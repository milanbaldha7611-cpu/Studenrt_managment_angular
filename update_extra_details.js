const db = require('./backend/config/db');

async function updateDetails() {
  console.log('Updating extra details for all students...');

  const colleges = ['Atmiya University', 'Marwadi University', 'RK University', 'Darshan University', 'VVP Engineering College'];
  const university = 'Gujarat Technological University (GTU)';

  try {
    const students = await db.query('SELECT id FROM students');
    
    for (const student of students) {
      const college = colleges[Math.floor(Math.random() * colleges.length)];
      const enrollment = `EN${2024000 + student.id}`;
      
      await db.query(
        'UPDATE students SET college_name = ?, university_name = ?, enrollment_no = ? WHERE id = ?',
        [college, university, enrollment, student.id]
      );
      console.log(`Updated ID ${student.id} -> ${enrollment} at ${college}`);
    }

    console.log('SUCCESS: All student details updated.');
    process.exit(0);
  } catch (err) {
    console.error('ERROR UPDATING DETAILS:', err.message);
    process.exit(1);
  }
}

updateDetails();

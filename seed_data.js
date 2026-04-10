const db = require('./backend/config/db');

async function seed() {
  console.log('Starting dummy data generation...');

  const semesters = [
    '1st Semester', '2nd Semester', '3rd Semester', '4th Semester',
    '5th Semester', '6th Semester', '7th Semester', '8th Semester'
  ];

  const firstNames = ['Aarav', 'Deepak', 'Ishaan', 'Kavya', 'Meera', 'Neha', 'Pranav', 'Rohan', 'Sanya', 'Tanvi', 'Vivan', 'Yash', 'Zoya', 'Anjali', 'Rahul', 'Suresh'];
  const lastNames = ['Sharma', 'Verma', 'Patel', 'Gupta', 'Singh', 'Mistri', 'Baldha', 'Shah', 'Jain', 'Kumari', 'Reddy', 'Chauhan', 'Mehta', 'Ghoshal', 'Desai', 'Kulkarni'];
  const courses = ['Bachelor of Science (B.Sc)', 'Bachelor of Commerce (B.Com)', 'Master of Technology (M.Tech)', 'Bachelor of Engineering (B.E)'];
  const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Electronic Circuits', 'Data Structures', 'Algorithms', 'Database Management', 'Networking'];
  const exams = ['Mid-Term Exam', 'Final Semester Exam', 'Unit Test 1', 'Unit Test 2'];

  try {
    for (const sem of semesters) {
      console.log(`Adding students for ${sem}...`);
      
      for (let i = 0; i < 2; i++) {
        const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
        const email = `${fname.toLowerCase()}.${lname.toLowerCase()}.${Math.floor(Math.random() * 999)}@example.com`;
        const course = courses[Math.floor(Math.random() * courses.length)];
        const gender = Math.random() > 0.5 ? 'Male' : 'Female';

        // Insert Student
        const studentRes = await db.query(
          'INSERT INTO students (first_name, last_name, email, phone, course, semester, gender, college_name, university_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [fname, lname, email, `98765432${Math.floor(Math.random() * 99)}`, course, sem, gender, 'Global Institute', 'Technical University']
        );
        
        const studentId = studentRes.insertId;

        // Add 2-3 results for this student
        for (let j = 0; j < 2; j++) {
          const exam = exams[Math.floor(Math.random() * exams.length)];
          const subj = subjects[Math.floor(Math.random() * subjects.length)];
          const marks = Math.floor(Math.random() * 40) + 60; // 60-100
          
          await db.query(
            'INSERT INTO results (student_id, exam_name, subject, semester, marks_obtained, max_marks) VALUES (?, ?, ?, ?, ?, ?)',
            [studentId, exam, subj, sem, marks, 100]
          );
        }

        // Add 5 attendance records
        for (let k = 0; k < 5; k++) {
          const date = new Date();
          date.setDate(date.getDate() - k);
          const dateStr = date.toISOString().split('T')[0];
          const status = Math.random() > 0.2 ? 'Present' : 'Absent';

          await db.query(
            'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
            [studentId, dateStr, status]
          );
        }
      }
    }
    console.log('SUCCESS: Generated dummy data for 16 students across all semesters.');
    process.exit(0);
  } catch (err) {
    console.error('ERROR SEEDING DATA:', err.message);
    process.exit(1);
  }
}

seed();

const mysql = require('mysql2/promise');

async function run() {
    const c = await mysql.createConnection({ host: 'localhost', user: 'root', password: '' });
    await c.query('USE student_management');
    try {
        await c.query("ALTER TABLE students ADD COLUMN gender VARCHAR(20)");
        console.log("Gender column added to students table.");
    } catch (e) {
        console.error("Gender column might already exist or error:", e.message);
    }
    c.end();
}
run();

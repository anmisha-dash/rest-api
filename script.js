const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// in-memory data
let students = [
  { id: 1, name: 'Anmisha', course: 'CSE', year: 2, grade: 'A' },
  { id: 2, name: 'Rahul', course: 'ECE', year: 3, grade: 'B' },
  { id: 3, name: 'Priya', course: 'IT', year: 1, grade: 'A+' },
  { id: 4, name: 'Arjun', course: 'CSE', year: 4, grade: 'B+' },
  { id: 5, name: 'Sneha', course: 'MECH', year: 2, grade: 'A' },
];

let nextId = 6;

// ---- ROUTES ----

// GET all students
app.get('/students', (req, res) => {
  const { course, year } = req.query;
  let result = students;

  if (course) result = result.filter(s => s.course.toLowerCase() === course.toLowerCase());
  if (year)   result = result.filter(s => s.year === parseInt(year));

  res.json({
    total: result.length,
    students: result
  });
});

// GET single student
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

// POST — create student
app.post('/students', (req, res) => {
  const { name, course, year, grade } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({ error: 'name, course and year are required' });
  }

  const newStudent = {
    id: nextId++,
    name,
    course,
    year: parseInt(year),
    grade: grade || 'N/A'
  };

  students.push(newStudent);
  res.status(201).json({
    message: 'Student created!',
    student: newStudent
  });
});

// PUT — update student
app.put('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  students[index] = { ...students[index], ...req.body, id: students[index].id };
  res.json({
    message: 'Student updated!',
    student: students[index]
  });
});

// DELETE — remove student
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const deleted = students.splice(index, 1)[0];
  res.json({
    message: 'Student deleted!',
    student: deleted
  });
});

// GET stats
app.get('/stats', (req, res) => {
  const courses = [...new Set(students.map(s => s.course))];
  const stats = courses.map(c => ({
    course: c,
    count: students.filter(s => s.course === c).length
  }));

  res.json({
    totalStudents: students.length,
    byCourse: stats,
    grades: {
      'A+': students.filter(s => s.grade === 'A+').length,
      'A':  students.filter(s => s.grade === 'A').length,
      'B+': students.filter(s => s.grade === 'B+').length,
      'B':  students.filter(s => s.grade === 'B').length,
    }
  });
});

app.listen(PORT, () => {
  console.log(`REST API running at http://localhost:${PORT}`);
  console.log('\nRoutes:');
  console.log('  GET    /students');
  console.log('  GET    /students?course=CSE&year=2');
  console.log('  GET    /students/:id');
  console.log('  POST   /students');
  console.log('  PUT    /students/:id');
  console.log('  DELETE /students/:id');
  console.log('  GET    /stats');
});
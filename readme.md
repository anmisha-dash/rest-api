# Day 23 — JSON REST API

A full REST API for a student database with all CRUD operations.

## Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | /students | Get all students |
| GET | /students?course=CSE | Filter by course |
| GET | /students/:id | Get one student |
| POST | /students | Create student |
| PUT | /students/:id | Update student |
| DELETE | /students/:id | Delete student |
| GET | /stats | Stats by course/grade |

## How to Run
```bash
npm install
node server.js
```

## Test with Browser
- `http://localhost:3000/students`
- `http://localhost:3000/students/1`
- `http://localhost:3000/stats`

## Tech Stack
- Node.js
- Express.js

## What I Learned
- Building full CRUD REST API
- GET, POST, PUT, DELETE HTTP methods
- Route parameters and query parameters
- Request body parsing with express.json()
- Proper HTTP status codes (200, 201, 400, 404)
- In-memory data management

## Part of
[30 Days 30 Projects](https://github.com/anmisha-dash/30-days-30-projects) challenge
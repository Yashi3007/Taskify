# Antigravity - Project Management App

A scalable full-stack Project Management Web App with role-based access (Admin / Member).

## Tech Stack
- **Frontend**: React + Redux Toolkit + React Router (New API)
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Authentication**: JWT
- **Validation**: Zod
- **Styling**: Vanilla CSS (Modern Design System)

## Architecture
### Backend (MVC)
- `models/`: Mongoose schemas (User, Project, Task)
- `controllers/`: Business logic
- `routes/`: API endpoints
- `middleware/`: Auth, Authorization, Error Handling

### Frontend (Feature-based)
- `features/auth/`: Login/Signup
- `features/projects/`: Project CRUD
- `features/tasks/`: Task management
- `features/dashboard/`: Summary stats

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Setup Backend
1. `cd backend`
2. `npm install`
3. Update `.env` with your MongoDB URI.
4. `npm run dev`

### Setup Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Roles
- **Admin**: Create projects, assign tasks, delete projects/tasks.
- **Member**: View projects they are part of, update task status.

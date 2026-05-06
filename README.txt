# Taskify - Project Management Application

A premium, dark-themed project management application built with React, Node.js, and MongoDB.

## Features
- User Authentication (Login/Signup)
- Project Creation and Management
- Task Management with Status Tracking (To Do, In Progress, Done)
- Cascade Deletion (Deleting a project removes all associated tasks)
- Premium "Neutral-900" Dark Aesthetic
- Fully Responsive Design

## Tech Stack
- Frontend: React, Redux Toolkit, Framer Motion, Lucide Icons, Vanilla CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT

## Local Setup

### 1. Backend Setup
1. Navigate to the `backend` folder.
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`.
4. Run the server: `npm run dev`

### 2. Frontend Setup
1. Navigate to the `frontend` folder.
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`.
4. Run the app: `npm run dev`

## Deployment (Railway)

### Backend Configuration
- Root Directory: `/backend`
- Environment Variables:
  - DATABASE: Your MongoDB Atlas Connection String
  - JWT_SECRET: A long random string
  - FRONTEND_URL: Your deployed frontend URL
  - NODE_ENV: production

### Frontend Configuration
- Root Directory: `/frontend`
- Environment Variables:
  - VITE_API_URL: Your deployed backend URL + /api/v1

## GitHub Repository
[https://github.com/Yashi3007/Taskify](https://github.com/Yashi3007/Taskify)

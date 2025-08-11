

# Time Tracker App

This project is a full-stack time tracking application with a React + Vite + Tailwind frontend and an Express + Sequelize (SQLite) backend.

---

## Architecture & Design Choices

- **Monorepo structure:** The project is split into `backend` and `frontend` folders for clear separation of concerns and easy development.
- **Backend:**
  - Built with Node.js, Express, and Sequelize ORM.
  - Uses SQLite for local development to avoid external DB dependencies; can be swapped for Postgres/MySQL in production.
  - RESTful API design with clear separation of models, controllers, and routes.
  - Error handling middleware for consistent API error responses.
- **Frontend:**
  - Built with React, Vite, and Tailwind CSS for fast development and modern UI.
  - Uses functional components and hooks for state management.
  - API base URL is configurable via environment variable for flexibility.
  - Tailwind CSS enables rapid, utility-first styling and responsive design.
- **.env.example files:** Provided in both frontend and backend for easy environment setup.
- **.gitignore:** Root-level ignore for node_modules, build outputs, .env files, and SQLite DB.

## Backend (Node.js + Express + Sequelize + SQLite)

**Setup:**

1. **Install dependencies**
   ```
   cd backend
   npm install
   ```

2. **Run the server**
   ```
   npm start
   ```
   The backend will start on [http://localhost:5000](http://localhost:5000) by default.

**Notes:**
- Uses SQLite (no setup required, database file will be created automatically).
- API endpoints are available under `/api` (e.g., `/api/projects`, `/api/tasks`, `/api/work`).

---

## Frontend (React + Vite + Tailwind CSS)

**Setup:**

1. **Install dependencies**
   ```
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```
   npm run dev
   ```
   The frontend will start on [http://localhost:5173](http://localhost:5173) by default.

**Notes:**
- Tailwind CSS is used for styling. All source files are in `frontend/src`.
- Make sure the backend is running for API calls to work.
- If you change the backend port, update the frontend API base URL or proxy settings in `vite.config.ts`.

---

## Project Structure

- `backend/` - Express API, Sequelize models, controllers, routes
- `frontend/` - React app, Tailwind CSS, Vite config

---


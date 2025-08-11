
# Time Tracker App

This project is a full-stack time tracking application with a React + Vite + Tailwind frontend and an Express + Sequelize (SQLite) backend.

---

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


# SeData Frontend (React + Tailwind CSS)

Minimalist, responsive frontend for the SeData Course & Assessment management system.

## Option 1: Instant Zero-Setup (via Spring Boot)
The frontend is already built into the Spring Boot application static directory:
1. Start your Spring Boot backend.
2. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```
No Node.js or `npm` installation required!

---

## Option 2: Standalone Vite + React Development
If you have Node.js installed and wish to run Vite in development mode:
```bash
cd frontend
npm install
npm run dev
```
The app will run at `http://localhost:5173` and automatically proxy API calls to Spring Boot on `http://localhost:8080`.

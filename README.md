# MedCare Plus — Hospital Appointment System

A full-stack hospital appointment booking system built with React, Express.js, MongoDB, and Mongoose.

## Project Structure

```
/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppointmentCard.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DoctorsPage.jsx
│   │   │   └── BookingPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .env.example
├── .gitignore
└── README.md
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on http://localhost:5175 and proxies /api requests to the backend.

## Backend Setup

```bash
cd backend
npm install
npm start
```

The backend runs on http://localhost:5004.

## MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas.
2. Create a `.env` file inside the `backend/` directory.
3. Add your connection string:

```
MONGO_URI=mongodb://localhost:27017/medcareplus
```

or for Atlas:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medcareplus
```

## Required Environment Variables

| Variable   | Description                  | Location      |
|------------|------------------------------|---------------|
| PORT       | Backend server port (5004)   | backend/.env  |
| MONGO_URI  | MongoDB connection string    | backend/.env  |

## API Endpoints

| Method | Endpoint                    | Description              | Status Codes |
|--------|-----------------------------|--------------------------|--------------|
| GET    | /api/v1/doctors             | Get all doctors          | 200          |
| GET    | /api/v1/appointments        | Get all appointments     | 200          |
| POST   | /api/v1/appointments        | Create a new appointment | 201, 400     |

### POST /api/v1/appointments

Request body:

```json
{
  "patientName": "John Doe",
  "doctorName": "Dr. Ananya Sharma",
  "date": "2026-08-25",
  "timeSlot": "10:00 AM - 11:00 AM"
}
```

### Middleware

- **requestLogger** — Logs `[METHOD] [PATH] [TIMESTAMP]` for every request.
- **Global Error Handler** — Returns structured JSON errors (500 status).

## Tech Stack

- **Frontend:** React 18, Vite, React Router v6
- **Backend:** Express.js
- **Database:** MongoDB + Mongoose

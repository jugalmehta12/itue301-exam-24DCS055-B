require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Patient = require("./models/Patient");

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// Middleware: Request Logger
const requestLogger = (req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl} [${new Date().toISOString()}]`);
  next();
};

app.use(requestLogger);

// In-memory data
const doctors = [
  { id: 1, name: "Dr. Ananya Sharma", specialisation: "Cardiology", available: true },
  { id: 2, name: "Dr. Rohan Mehta", specialisation: "Neurology", available: true },
  { id: 3, name: "Dr. Priya Singh", specialisation: "Orthopedics", available: false },
  { id: 4, name: "Dr. Arjun Patel", specialisation: "Dermatology", available: true },
];

let appointments = [];
let nextAppointmentId = 1;

// Routes
app.get("/api/v1/doctors", (req, res) => {
  res.status(200).json({ success: true, data: doctors });
});

app.get("/api/v1/appointments", (req, res) => {
  res.status(200).json({ success: true, data: appointments });
});

app.post("/api/v1/appointments", (req, res) => {
  const { patientName, doctorName, date, timeSlot } = req.body;

  if (!patientName || !doctorName || !date || !timeSlot) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: patientName, doctorName, date, timeSlot",
    });
  }

  const appointment = {
    id: nextAppointmentId++,
    patientName,
    doctorName,
    date,
    timeSlot,
    status: "pending",
  };

  appointments.push(appointment);
  res.status(201).json({ success: true, data: appointment });
});

// MongoDB Demonstration Routes
app.post("/api/v1/mongodb/test-patient", async (req, res) => {
  try {
    const patient = await Patient.create({
      name: "Test Patient",
      email: `test${Date.now()}@example.com`,
      phone: "9999999999",
      bloodGroup: "O+",
      age: 20,
    });

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create patient",
      error: error.message,
    });
  }
});

app.post("/api/v1/mongodb/test-validation", async (req, res) => {
  try {
    const patient = await Patient.create({
      name: "Invalid Patient",
      email: `invalid${Date.now()}@example.com`,
      bloodGroup: "XYZ",
    });

    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong on the server.",
    });
  }
});

// Global Error Handler (must be last middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`MedCare Plus server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

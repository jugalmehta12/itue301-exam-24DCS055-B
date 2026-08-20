import { useState } from "react";
import AppointmentCard from "../components/AppointmentCard";

function BookingPage() {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="booking-page">
      <h1>Book an Appointment</h1>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient name"
            required
          />
        </div>

        <div className="form-group">
          <label>Doctor Name</label>
          <select value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required>
            <option value="">Select a doctor</option>
            <option value="Dr. Ananya Sharma">Dr. Ananya Sharma - Cardiology</option>
            <option value="Dr. Rohan Mehta">Dr. Rohan Mehta - Neurology</option>
            <option value="Dr. Priya Singh">Dr. Priya Singh - Orthopedics</option>
            <option value="Dr. Arjun Patel">Dr. Arjun Patel - Dermatology</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Time Slot</label>
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
            <option value="">Select time slot</option>
            <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
            <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
            <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
          </select>
        </div>

        <button type="submit" className="btn">Confirm Booking</button>
      </form>

      {submitted && (
        <div className="booking-summary">
          <h2>Booking Confirmed!</h2>
          <AppointmentCard
            patientName={patientName}
            doctorName={doctorName}
            date={date}
            timeSlot={timeSlot}
            status="pending"
          />
        </div>
      )}
    </div>
  );
}

export default BookingPage;

function AppointmentCard({ patientName, doctorName, date, timeSlot, status }) {
  const statusClass = `status-${status}`;

  return (
    <div className="appointment-card">
      <h3>Appointment Details</h3>
      <p><strong>Patient:</strong> {patientName}</p>
      <p><strong>Doctor:</strong> {doctorName}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time Slot:</strong> {timeSlot}</p>
      <p className={`status ${statusClass}`}>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );
}

export default AppointmentCard;

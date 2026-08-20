import { useState, useEffect } from "react";

function DoctorsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/v1/doctors");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="loading">Loading doctors...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="doctors-page">
      <h1>Our Doctors</h1>
      <div className="doctors-list">
        {data.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p><strong>Specialisation:</strong> {doctor.specialisation}</p>
            <p>
              <strong>Availability:</strong>{" "}
              {doctor.available ? "Available" : "Not Available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsPage;

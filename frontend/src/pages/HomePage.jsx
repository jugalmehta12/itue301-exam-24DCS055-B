import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to MedCare Plus</h1>
      <p>Your trusted partner in healthcare. Book appointments with top specialists easily.</p>
      <div className="home-actions">
        <Link to="/doctors" className="btn">View Doctors</Link>
        <Link to="/booking" className="btn btn-secondary">Book Appointment</Link>
      </div>
    </div>
  );
}

export default HomePage;

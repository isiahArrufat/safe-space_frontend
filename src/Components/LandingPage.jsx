import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Random message quote</h1>

      <h3>
       message Above is to assist with inspiration when you write 
      </h3>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default LandingPage;

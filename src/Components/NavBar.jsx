import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "../App.css";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, [toggleLogin]);

  return (
    <div className="flex space-x-4 bg-purple-300">
      <h2>
        <Link style={{ textDecoration: "none" }} to="/">
        <img className="w-20 h-20" src="https://mymodernmet.com/wp/wp-content/uploads/2017/07/negative-space-graphic-design-10.jpg" alt="Your Logo" />
        </Link>
      </h2>

        {!toggleLogin ? (

        <Link to={"/login"}>
          S.S
          < br/>
          <span>Login</span>
          < br/>
          <button onClick={handleLogout}>Logout</button>
        </Link>
      ) : (
        <div>
          {user && <span>{user.username.toUpperCase()}? | </span>}
          <h3>{}</h3>

          <Link onClick={handleLogout}>
            < br/>
            <span>Logout</span>
          </Link>
          <Link to={"/profile"}>
            <span>My Profile</span>
          </Link>
        </div>
      )}
      <hr />
    </div>
  );
};

export default NavBar;

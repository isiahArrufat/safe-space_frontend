import React from 'react';
import { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
import ProfilePage from "./Components/ProfilePage"

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);
  

  

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-blend-lighten md:bg-blend-darken h-screen relative bg-indigo-300">
      <div className="absolute inset-0 bg-grey opacity-80">
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />

        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} />}
          />
          <Route 
            path="/profile" 
            element={<ProfilePage />} 
          />
        </Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;


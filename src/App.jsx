import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Details from "./pages/Details";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      } else {
        if (!location.pathname.includes("/register")) {
          navigate("/login");
        }
      }
    }
  }, [navigate, location, token]);

  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
    }
    return children; 
  }

  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute isAuth={token}>
              <MainLayout><Home /></MainLayout>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/books/:id"
          element={<MainLayout><Details /></MainLayout>}
        />
      </Routes>
    </div>
  );
}

export default App;

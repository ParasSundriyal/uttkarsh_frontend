import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import SubmitGrievance from "./components/Grievance/SubmitGrievance";
import GrievanceDetails from "./components/Grievance/GrievanceDetails";
import ChatBot from "./pages/Chatbot";
import AdminLogin from "./pages/admin/Login";
import Grievances from "./pages/admin/Grievances";
import Users from "./pages/admin/Users";
import AdminDashboard from "./pages/admin/Dashboard";
import Stats from "./pages/admin/Stats";
import Layout from "./components/Layout/Layout";
import DepartmentLogin from "./pages/department/Login";
import DepartmentDashboard from "./pages/department/Dashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/submit-grievance"
            element={
              <PrivateRoute>
                <SubmitGrievance />
              </PrivateRoute>
            }
          />
          <Route
            path="/grievance/:id"
            element={
              <PrivateRoute>
                <GrievanceDetails />
              </PrivateRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/grievances"
            element={
              <PrivateRoute>
                <Grievances />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/stats"
            element={
              <PrivateRoute>
                <Stats />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/department/login" element={<DepartmentLogin />} />
          <Route path="/department/dashboard" element={<DepartmentDashboard />} />

          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

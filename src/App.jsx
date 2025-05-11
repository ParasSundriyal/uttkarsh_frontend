import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css'
import HomePage from './pages/HomePage'
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import SubmitGrievance from './components/Grievance/SubmitGrievance';
import GrievanceDetails from './components/Grievance/GrievanceDetails';
import ChatBot from './pages/Chatbot';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
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
      </Routes>
    </Router>
  )
}

export default App

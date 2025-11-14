import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import HomePage from "../pages/HomePage"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />

        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />

        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/tasks" 
          element={
            <PrivateRoute>
              <div>Tasks</div>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <div>Profile</div>
            </PrivateRoute>
          } 
        />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

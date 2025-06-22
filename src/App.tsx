import React from 'react'
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from 'pages/Login'
import Register from 'pages/Register'
import Home from 'pages/Home'
import Room from 'pages/Room'
import { AuthProvider, useAuth } from 'context/AuthContext'
import DashboardLayout from 'components/layout/DashboardLayout'

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <DashboardLayout>{children}</DashboardLayout>
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/rooms" element={<PrivateRoute><Room /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}
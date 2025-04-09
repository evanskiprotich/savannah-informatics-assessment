import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import AlbumPage from './pages/AlbumPage';
import PhotoPage from './pages/PhotoPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route
                path="home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users/:userId"
                element={
                  <ProtectedRoute>
                    <UserPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="albums/:albumId"
                element={
                  <ProtectedRoute>
                    <AlbumPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="photos/:photoId"
                element={
                  <ProtectedRoute>
                    <PhotoPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
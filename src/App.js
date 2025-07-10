import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import CourseDetail from './pages/CourseDetail';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import AISuggestions from './pages/AISuggestions';
import History from './pages/History';
import Auth from './pages/Auth';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ToastProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="course/:id" element={<CourseDetail />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="cart" element={<Cart />} />
                <Route 
                  path="ai-suggestions" 
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <AISuggestions />
                    </ProtectedRoute>
                  } 
                />
                <Route path="history" element={<History />} />
                <Route path="auth" element={<Auth />} />
              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;

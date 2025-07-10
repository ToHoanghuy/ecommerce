import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CourseDetail from './pages/CourseDetail';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import AISuggestions from './pages/AISuggestions';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="cart" element={<Cart />} />
            <Route path="ai-suggestions" element={<AISuggestions />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;

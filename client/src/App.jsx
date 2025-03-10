import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import "./styles/browse.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomePage from './pages/HomePage';
import ErrorPage from './utils/ErrorPage';
import BrowsePage from './pages/BrowsePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import BookshelfPage from './pages/BookshelfPage';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Save to localStorage
      return newMode;
    });
  };

  return (
    <div style={{
      backgroundColor: isDarkMode ? 'black' : 'white',
      minHeight: '100vh',
      color: isDarkMode ? 'white' : 'black'
    }}>
      <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Routes>
        <Route path='/' element={< HomePage />} />
        <Route path='/browse' element={< BrowsePage />} />
        <Route path='/bookshelf' element={< BookshelfPage />} />
        <Route path='/login' element={< LoginPage />} />
        <Route path='/register' element={< RegisterPage />} />
        {/* Error paths for page */}
        <Route path='*' element={ < ErrorPage/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

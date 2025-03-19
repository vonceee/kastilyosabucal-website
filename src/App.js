import React, { useState } from 'react';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      {currentPage === 'home' && <Home navigateTo={navigateTo} />}
      {currentPage === 'about' && <About navigateTo={navigateTo} />}
      {currentPage === 'services' && <Services navigateTo={navigateTo} />}
      {currentPage === 'contact' && <Contact navigateTo={navigateTo} />}
      {/* You can add additional pages like 'photos' similarly */}
    </div>
  );
}

export default App;

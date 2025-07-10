import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Chatbot from './Chatbot';
import './Layout.css';

const Layout = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="app">
      <Header onOpenChatbot={() => setShowChatbot(true)} />
      
      <main className="main-content">
        <Outlet />
      </main>

      <Chatbot
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
      />
    </div>
  );
};

export default Layout;

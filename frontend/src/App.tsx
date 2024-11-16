// app.tsx
import React from 'react';
import NavBar from './components/NavBar';
import { NotificationProvider } from './context/NotificationContext';
import WeaponsManagement from './pages/WeaponsManagement';

const App: React.FC = () => {
  return (
    <div className='App'>
      <NotificationProvider>
        <NavBar />
        <WeaponsManagement />
      </NotificationProvider>
    </div>
  );
};

export default App;

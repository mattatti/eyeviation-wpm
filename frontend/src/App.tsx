// app.tsx
import React from 'react';
import { Provider } from 'react-redux';
import NavBar from './components/NavBar';
import WeaponsManagement from './pages/WeaponsManagement';
import store from './redux/store';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <NavBar />
        <WeaponsManagement />
      </Provider>
    </div>
  );
};

export default App;

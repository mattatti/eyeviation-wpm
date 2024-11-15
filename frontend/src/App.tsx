import React, { useEffect, useState } from 'react';
import Customizer from './components/Customizer';
import WeaponList from './components/WeaponList';
import { CustomizedWeapon } from './types';

const App: React.FC = () => {
  const [customWeapons, setCustomWeapons] = useState<CustomizedWeapon[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/customize`)
      .then((res) => res.json())
      .then((data) => setCustomWeapons(data));
  }, []);

  const addWeapon = (weapon: CustomizedWeapon) => {
    setCustomWeapons((prev) => [...prev, weapon]);
  };

  const sendWeaponToPrinter = async (id: number) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/printer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    setCustomWeapons((prev) =>
      prev.map((w) => (w.id === id ? { ...w, sentToPrinter: true } : w))
    );
  };

  return (
    <div className='app'>
      <h1>Weapon Customizer</h1>
      <Customizer onWeaponAdd={addWeapon} />
      <WeaponList weapons={customWeapons} onPrint={sendWeaponToPrinter} />
    </div>
  );
};

export default App;

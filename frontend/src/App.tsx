import React, { useEffect, useState } from 'react';
import Customizer from './components/Customizer';
import { CustomizedWeapon } from './types';

const App: React.FC = () => {
  const [customizedWeapons, setCustomizedWeapons] = useState<
    CustomizedWeapon[]
  >([]);

  // Fetch the list of all customized weapons when the component mounts
  useEffect(() => {
    const fetchCustomizedWeapons = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/customize`
        );
        const data = await response.json();
        setCustomizedWeapons(data);
      } catch (error) {
        console.error('Error fetching customized weapons:', error);
      }
    };

    fetchCustomizedWeapons();
  }, []);

  // Function to handle adding a new weapon after customization
  const handleWeaponAdd = (weapon: CustomizedWeapon) => {
    setCustomizedWeapons((prevWeapons) => [...prevWeapons, weapon]);
  };

  return (
    <div className='App'>
      <h1>Weapon Customizer</h1>
      <Customizer onWeaponAdd={handleWeaponAdd} />

      <h2>Customized Weapons</h2>
      <ul>
        {customizedWeapons.map((weapon) => (
          <li key={weapon.id}>
            {weapon.baseWeapon} - {weapon.createdAt}
            {/* You can display the weapon parts here if necessary */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

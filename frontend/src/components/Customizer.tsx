import React, { useState } from 'react';
import { CustomizedWeapon, WeaponParts } from '../types';

interface Props {
  onWeaponAdd: (weapon: CustomizedWeapon) => void;
}

const Customizer: React.FC<Props> = ({ onWeaponAdd }) => {
  const [baseWeapon, setBaseWeapon] = useState<string>('');
  const [parts, setParts] = useState<WeaponParts>({
    sight: '',
    laserPointer: '',
    gripHandle: '',
    barrelAttachment: '',
  });

  const handleSave = async (sendToPrinter: boolean) => {
    const res = await fetch('/customize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baseWeapon, parts, sendToPrinter }),
    });
    const newWeapon: CustomizedWeapon = await res.json();
    onWeaponAdd(newWeapon);
  };

  return (
    <div className='customizer'>
      <h2>Customize Weapon</h2>
      <label>
        Base Weapon:
        <select
          value={baseWeapon}
          onChange={(e) => setBaseWeapon(e.target.value)}
        >
          <option value=''>Select Weapon</option>
          <option value='Glock 17'>Glock 17</option>
          <option value='M4'>M4</option>
          <option value='FN Minimi'>FN Minimi</option>
        </select>
      </label>
      {/* Dropdowns for parts */}
      <button onClick={() => handleSave(false)}>Save</button>
      <button onClick={() => handleSave(true)}>Save & Print</button>
    </div>
  );
};

export default Customizer;

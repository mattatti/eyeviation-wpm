import React, { useState } from 'react';
import weaponData from '../data/weaponsData';
import { CustomizedWeapon, WeaponParts, WeaponPartsData } from '../types';

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

  const data = weaponData as WeaponPartsData;

  // Handle base weapon change
  const handleBaseWeaponChange = (weapon: string) => {
    setBaseWeapon(weapon);
    setParts({
      sight: '',
      laserPointer: '',
      gripHandle: '',
      barrelAttachment: '',
    });
  };

  // Handle part selection
  const handlePartChange = (type: keyof WeaponParts, value: string) => {
    setParts((prev) => ({ ...prev, [type]: value }));
  };

  // Save weapon (optionally send to printer)
  const handleSave = async (sendToPrinter: boolean) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/customize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baseWeapon, parts, sendToPrinter }),
    });
    console.log('response from handle save', res);

    const newWeapon: CustomizedWeapon = await res.json();
    onWeaponAdd(newWeapon);

    if (sendToPrinter) {
      // Call the print API
      await sendWeaponToPrinter(newWeapon);
    }
  };

  // Call the print API
  const sendWeaponToPrinter = async (weapon: CustomizedWeapon) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/customize/print`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weapon),
    })
      .then((res) => res.json())
      .then(() => {
        alert(`Weapon sent to printer!`);
      })
      .catch((err) => {
        alert('Failed to send weapon to printer');
        console.error(err);
      });
  };

  // Render part dropdowns
  const renderPartDropdown = (
    type: keyof WeaponParts,
    label: string,
    options: { name: string; compatibleWith: string[] }[]
  ) => {
    const compatibleOptions = options.filter((option) =>
      option.compatibleWith.includes(baseWeapon)
    );

    return (
      <label>
        {label}:
        <select
          value={parts[type]}
          onChange={(e) => handlePartChange(type, e.target.value)}
          disabled={!baseWeapon}
        >
          <option value=''>Select {label}</option>
          {compatibleOptions.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Customize Weapon</h2>

      <label>
        Base Weapon:
        <select
          value={baseWeapon}
          onChange={(e) => handleBaseWeaponChange(e.target.value)}
        >
          <option value=''>Select Weapon</option>
          {data.weapons.map((weapon) => (
            <option key={weapon} value={weapon}>
              {weapon}
            </option>
          ))}
        </select>
      </label>

      {/* Part Dropdowns */}
      {renderPartDropdown('sight', 'Sight', data.parts.sights)}
      {renderPartDropdown(
        'laserPointer',
        'Laser Pointer',
        data.parts.laserPointers
      )}
      {renderPartDropdown('gripHandle', 'Grip Handle', data.parts.gripHandles)}
      {renderPartDropdown(
        'barrelAttachment',
        'Barrel Attachment',
        data.parts.barrelAttachments
      )}

      <div className='buttons'>
        <button onClick={() => handleSave(false)} disabled={!baseWeapon}>
          Save
        </button>
        <button onClick={() => handleSave(true)} disabled={!baseWeapon}>
          Save & Print
        </button>
      </div>
    </div>
  );
};

export default Customizer;

import React from 'react';
import { CustomizedWeapon } from '../types';

interface Props {
  weapons: CustomizedWeapon[];
  onPrint: (id: number) => void;
}

const WeaponList: React.FC<Props> = ({ weapons, onPrint }) => {
  return (
    <div className='weapon-list'>
      <h2>Customized Weapons</h2>
      <ul>
        {weapons.map((weapon) => (
          <li key={weapon.id}>
            <strong>{weapon.baseWeapon}</strong> -{' '}
            {weapon.sentToPrinter ? 'Printed' : 'Not Printed'}
            <button onClick={() => onPrint(weapon.id)}>Print</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeaponList;

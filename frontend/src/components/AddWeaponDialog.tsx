import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { weaponsData } from '../data/weaponsData';
import { CustomizedWeapon, WeaponParts } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onWeaponAdd: (weapon: CustomizedWeapon) => void;
}

const AddWeaponDialog: React.FC<Props> = ({ open, onClose, onWeaponAdd }) => {
  const [baseWeapon, setBaseWeapon] = useState<string>('');
  const [parts, setParts] = useState<WeaponParts>({
    sight: '',
    laserPointer: '',
    gripHandle: '',
    barrelAttachment: '',
  });
  const [availableParts, setAvailableParts] = useState<any>({
    sights: [],
    laserPointers: [],
    gripHandles: [],
    barrelAttachments: [],
  });

  useEffect(() => {
    if (baseWeapon) {
      // Filter parts based on the selected base weapon
      setAvailableParts({
        sights: weaponsData.sights.filter((part) =>
          part.compatibleWith.includes(baseWeapon)
        ),
        laserPointers: weaponsData.laserPointers.filter((part) =>
          part.compatibleWith.includes(baseWeapon)
        ),
        gripHandles: weaponsData.gripHandles.filter((part) =>
          part.compatibleWith.includes(baseWeapon)
        ),
        barrelAttachments: weaponsData.barrelAttachments.filter((part) =>
          part.compatibleWith.includes(baseWeapon)
        ),
      });
    } else {
      setAvailableParts({
        sights: [],
        laserPointers: [],
        gripHandles: [],
        barrelAttachments: [],
      });
    }
  }, [baseWeapon]);

  const handlePartChange = (part: keyof WeaponParts, value: string) => {
    setParts((prevParts) => ({ ...prevParts, [part]: value }));
  };

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
    onClose();
    handleReset();
  };

  // Call the print API
  const sendWeaponToPrinter = async (weapon: CustomizedWeapon) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/customize/print`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weapon),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          alert(data.message);
          onClose();
          handleReset();
        } else {
          const errorData = await res.json();
          alert(errorData.message || 'Failed to send weapon to printer');
        }
      })
      .catch((err) => {
        alert('Failed to send weapon to printer');
        console.error(err);
      });
  };

  const handleReset = () => {
    setBaseWeapon('');
    setParts({
      sight: '',
      laserPointer: '',
      gripHandle: '',
      barrelAttachment: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontSize={20}>Add Weapon</DialogTitle>
      <DialogContent style={{ width: '500px' }}>
        {/* Base Weapon Select */}
        <FormControl required size='small' fullWidth margin='normal'>
          <InputLabel>Base Weapon</InputLabel>
          <Select
            value={baseWeapon}
            onChange={(e) => setBaseWeapon(e.target.value)}
            label='Base Weapon'
          >
            {weaponsData.baseWeapons.map((weapon) => (
              <MenuItem key={weapon.id} value={weapon.id}>
                {weapon.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Weapon Parts - Sight */}
        <FormControl
          size='small'
          fullWidth
          margin='normal'
          disabled={!baseWeapon}
        >
          <InputLabel>Sight</InputLabel>
          <Select
            value={parts.sight}
            onChange={(e) => handlePartChange('sight', e.target.value)}
            label='Sight'
          >
            {availableParts.sights.map((sight: any) => (
              <MenuItem key={sight.id} value={sight.id}>
                {sight.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Weapon Parts - Laser Pointer */}
        <FormControl
          size='small'
          fullWidth
          margin='normal'
          disabled={!baseWeapon}
        >
          <InputLabel>Laser Pointer</InputLabel>
          <Select
            value={parts.laserPointer}
            onChange={(e) => handlePartChange('laserPointer', e.target.value)}
            label='Laser Pointer'
          >
            {availableParts.laserPointers.map((laserPointer: any) => (
              <MenuItem key={laserPointer.id} value={laserPointer.id}>
                {laserPointer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Weapon Parts - Grip Handle */}
        <FormControl
          size='small'
          fullWidth
          margin='normal'
          disabled={!baseWeapon}
        >
          <InputLabel>Grip Handle</InputLabel>
          <Select
            value={parts.gripHandle}
            onChange={(e) => handlePartChange('gripHandle', e.target.value)}
            label='Grip Handle'
          >
            {availableParts.gripHandles.map((gripHandle: any) => (
              <MenuItem key={gripHandle.id} value={gripHandle.id}>
                {gripHandle.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Weapon Parts - Barrel Attachment */}
        <FormControl
          size='small'
          fullWidth
          margin='normal'
          disabled={!baseWeapon}
        >
          <InputLabel>Barrel Attachment</InputLabel>
          <Select
            value={parts.barrelAttachment}
            onChange={(e) =>
              handlePartChange('barrelAttachment', e.target.value)
            }
            label='Barrel Attachment'
          >
            {availableParts.barrelAttachments.map((barrelAttachment: any) => (
              <MenuItem key={barrelAttachment.id} value={barrelAttachment.id}>
                {barrelAttachment.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            handleReset();
          }}
          color='primary'
        >
          Cancel
        </Button>
        <Button
          disabled={!baseWeapon}
          onClick={() => handleSave(false)}
          color='primary'
        >
          Save
        </Button>

        <Button
          disabled={!baseWeapon}
          onClick={() => handleSave(true)}
          color='primary'
        >
          Save & Print
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWeaponDialog;

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
import { useDispatch } from 'react-redux';
import { addNotificationThunk } from '../redux/notificationSlice';
import { CustomizedWeapon, WeaponParts } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onWeaponAdd: (weapon: CustomizedWeapon) => void;
}

const AddWeaponDialog: React.FC<Props> = ({ open, onClose, onWeaponAdd }) => {
  const dispatch = useDispatch();
  // const { notifications, loading, error } = useSelector(
  //   (state: any) => state.Notification
  // );
  const [baseWeapons, setBaseWeapons] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any>({
    sights: [],
    laserPointers: [],
    gripHandles: [],
    barrelAttachments: [],
  });

  const [baseWeapon, setBaseWeapon] = useState<string>('');
  const [parts, setParts] = useState<WeaponParts>({
    sight: '',
    laserPointer: '',
    gripHandle: '',
    barrelAttachment: '',
  });

  useEffect(() => {
    if (open) {
      fetchBaseWeapons();
    }
  }, [open]);

  useEffect(() => {
    if (baseWeapon) {
      fetchAttachmentsForBaseWeapon(baseWeapon);
    } else {
      resetAttachments();
    }
  }, [baseWeapon]);

  const fetchBaseWeapons = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/base-weapons`
      );
      const data = await res.json();
      setBaseWeapons(data);
    } catch (error) {
      console.error('Failed to fetch base weapons:', error);
    }
  };

  const fetchAttachmentsForBaseWeapon = async (weaponId: string) => {
    try {
      const types = [
        'sight',
        'laser pointer',
        'grip handle',
        'barrel attachment',
      ];
      const attachmentsData = await Promise.all(
        types.map((type) =>
          fetch(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/attachments/${type}?weaponId=${weaponId}`
          ).then((res) => res.json())
        )
      );

      setAttachments({
        sights: attachmentsData[0],
        laserPointers: attachmentsData[1],
        gripHandles: attachmentsData[2],
        barrelAttachments: attachmentsData[3],
      });
    } catch (error) {
      console.error('Failed to fetch attachments:', error);
    }
  };

  const resetAttachments = () => {
    setAttachments({
      sights: [],
      laserPointers: [],
      gripHandles: [],
      barrelAttachments: [],
    });
  };

  const handlePartChange = (part: keyof WeaponParts, value: string) => {
    setParts((prevParts) => ({ ...prevParts, [part]: value }));
  };

  const handleSave = async (sendToPrinter: boolean) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/customize`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseWeapon, parts, sendToPrinter }),
      }
    );

    const newWeapon: CustomizedWeapon = await res.json();
    onWeaponAdd(newWeapon);

    if (sendToPrinter) {
      // Call the print API
      await sendWeaponToPrinter(newWeapon);
    }
    onClose();
    handleReset();
  };

  const sendWeaponToPrinter = async (weapon: CustomizedWeapon) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/customize/print`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weapon),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          onClose();
          handleReset();
          dispatch(
            addNotificationThunk({
              message: data.message,
            })
          );
        } else {
          const errorData = await res.json();
          console.error(
            errorData.message || 'Failed to send weapon to printer'
          );
        }
      })
      .catch((err) => {
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
    resetAttachments();
  };

  const camelToReadable = (str: string) => {
    // Add spaces before capital letters and capitalize the first letter of each word
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/^./, (match) => match.toUpperCase());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontSize={20}>Add Weapon</DialogTitle>
      <DialogContent style={{ width: '500px' }}>
        <FormControl required size='small' fullWidth margin='normal'>
          <InputLabel>Base Weapon</InputLabel>
          <Select
            value={baseWeapon || ''}
            onChange={(e) => setBaseWeapon(e.target.value)}
            label='Base Weapon'
          >
            {baseWeapons.map((weapon) => (
              <MenuItem key={weapon.id} value={weapon.id}>
                {weapon.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {['sight', 'laserPointer', 'gripHandle', 'barrelAttachment'].map(
          (part) => (
            <FormControl
              size='small'
              fullWidth
              margin='normal'
              disabled={!baseWeapon}
              key={part}
            >
              <InputLabel>{camelToReadable(part)}</InputLabel>
              <Select
                value={parts[part as keyof WeaponParts]}
                onChange={(e) =>
                  handlePartChange(part as keyof WeaponParts, e.target.value)
                }
                label={camelToReadable(part)}
              >
                {attachments[`${part}s`]?.map((item: any) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
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

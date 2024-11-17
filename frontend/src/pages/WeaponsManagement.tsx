import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddWeaponDialog from '../components/AddWeaponDialog';
import WeaponTable from '../components/WeaponsTable';
import {
  addNotificationThunk,
  fetchNotifications,
} from '../redux/notificationSlice';
import { CustomizedWeapon } from '../types';

const WeaponsManagement: React.FC = () => {
  const dispatch = useDispatch();

  const [weapons, setWeapons] = useState<CustomizedWeapon[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const fetchWeapons = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/customize`
    );
    const data = await response.json();
    setWeapons(data);
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleWeaponAdd = (weapon: CustomizedWeapon) => {
    setWeapons((prevWeapons) => [weapon, ...prevWeapons]);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/customize/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData.message || 'Failed to delete weapon');
        return;
      }

      // Once deleted, remove the weapon from the list
      setWeapons(weapons.filter((weapon) => weapon.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = async (id: string) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/customize/print/ `, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();

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
        alert('Failed to send weapon to printer');
        console.error(err);
      });
  };

  return (
    <Box
      style={{
        position: 'relative',
        margin: 10,
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <Typography fontWeight={'bold'} fontSize={20} color='black'>
        Weapon Printing Management
      </Typography>
      <Button
        style={{ width: '15vw' }}
        variant='contained'
        color='primary'
        onClick={handleDialogOpen}
      >
        Add Weapon
      </Button>
      <AddWeaponDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onWeaponAdd={handleWeaponAdd}
      />

      <WeaponTable
        weapons={weapons}
        onDelete={handleDelete}
        onPrint={handlePrint}
      />
    </Box>
  );
};

export default WeaponsManagement;

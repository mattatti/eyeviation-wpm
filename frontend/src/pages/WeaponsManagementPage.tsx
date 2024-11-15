import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddWeaponDialog from '../components/AddWeaponDialog';
import WeaponTable from '../components/WeaponsTable';
import { CustomizedWeapon } from '../types';

const WeaponsManagementPage: React.FC = () => {
  const [weapons, setWeapons] = useState<CustomizedWeapon[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const fetchWeapons = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/customize`
    );
    const data = await response.json();
    setWeapons(data);
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  const handleWeaponAdd = (weapon: CustomizedWeapon) => {
    setWeapons((prevWeapons) => [weapon, ...prevWeapons]);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setWeapons(weapons.filter((weapon) => weapon.id !== id));
  };

  const handleEdit = (id: string) => {
    // Handle edit logic
    console.log('Edit weapon with ID:', id);
  };

  const handleDetails = (weapon: CustomizedWeapon) => {
    // Handle details logic
    console.log('Weapon details:', weapon);
  };

  const handlePrint = (id: string) => {
    // Handle print logic
    console.log('Print weapon with ID:', id);
  };

  return (
    <Box
      style={{ margin: 10, display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <Typography fontWeight={'bold'} fontSize={30} color='black'>
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
        onEdit={handleEdit}
        onDetails={handleDetails}
        onPrint={handlePrint}
      />
    </Box>
  );
};

export default WeaponsManagementPage;

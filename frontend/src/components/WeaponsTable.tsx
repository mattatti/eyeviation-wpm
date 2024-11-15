import { Delete, Edit, Info, Print } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import React, { useState } from 'react';

import { CustomizedWeapon } from '../types';

interface WeaponTableProps {
  weapons: CustomizedWeapon[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onDetails: (weapon: CustomizedWeapon) => void;
  onPrint: (id: string) => void;
}

const WeaponTable: React.FC<WeaponTableProps> = ({
  weapons,
  onDelete,
  onEdit,
  onDetails,
  onPrint,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState<CustomizedWeapon | null>(
    null
  );

  const handleOpenDialog = (weapon: CustomizedWeapon) => {
    setSelectedWeapon(weapon);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedWeapon(null);
    setDialogOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'baseWeapon',
      flex: 1,
      headerName: 'Name',
      width: 200,
      sortable: true,
    },
    {
      field: 'createdAt',
      flex: 0.5,
      headerName: 'Created At',
      width: 200,
      sortable: true,
      valueFormatter: (params: any) => {
        return format(new Date(params), 'dd-MM-yyyy HH:mm:ss');
      },
    },

    {
      field: 'actions',
      flex: 1,
      headerName: '',
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        const weapon = params.row;
        return (
          <div style={{ float: 'right' }}>
            <IconButton
              color='primary'
              onClick={() => handleOpenDialog(weapon)}
            >
              <Info />
            </IconButton>
            <IconButton color='primary' onClick={() => onPrint(weapon.id)}>
              <Print />
            </IconButton>
            <IconButton color='secondary' onClick={() => onEdit(weapon.id)}>
              <Edit />
            </IconButton>
            <IconButton color='error' onClick={() => onDelete(weapon.id)}>
              <Delete />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <DataGrid
        rows={weapons}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />

      {selectedWeapon && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{`${selectedWeapon.baseWeapon} Modifications:`}</DialogTitle>
          <DialogContent>
            <Typography>
              <strong>Sight:</strong> {selectedWeapon.parts.sight || 'None'}
            </Typography>
            <Typography>
              <strong>Laser Pointer:</strong>{' '}
              {selectedWeapon.parts.laserPointer || 'None'}
            </Typography>
            <Typography>
              <strong>Grip Handle:</strong>{' '}
              {selectedWeapon.parts.gripHandle || 'None'}
            </Typography>
            <Typography>
              <strong>Barrel Attachment:</strong>{' '}
              {selectedWeapon.parts.barrelAttachment || 'None'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default WeaponTable;

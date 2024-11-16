import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  message: string;
}

const MessageDialog: React.FC<Props> = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontSize={20}>Notification</DialogTitle>

      <DialogContent style={{ width: '500px' }}>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;

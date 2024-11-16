import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Badge,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';

const NotificationBell: React.FC = () => {
  const { notifications } = useNotification();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hasReadNotifications, setHasReadNotifications] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setHasReadNotifications(true); // Mark notifications as read
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color='default' onClick={handleOpen}>
        <Badge
          badgeContent={!hasReadNotifications ? notifications.length : 0}
          color='secondary'
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: 'red',
              color: 'white',
            },
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '300px',
          },
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification: any, index: number) => (
            <React.Fragment key={notification.id}>
              <MenuItem onClick={handleClose}>
                <Typography variant='body2'>
                  {notification.message} -{' '}
                  {notification.timestamp.toLocaleTimeString()}
                </Typography>
              </MenuItem>
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <MenuItem onClick={handleClose}>
            <Typography variant='body2'>No new notifications</Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default NotificationBell;

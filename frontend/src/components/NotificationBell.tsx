import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Badge,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotifications,
  markAllNotificationsAsRead,
} from '../redux/notificationSlice';

const NotificationBell: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state: any) => state.notifications
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // To control menu open/close
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Fetch notifications when component mounts
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    setUnreadCount(notifications.filter((n: any) => !n.is_read).length);
  }, [notifications]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Set the current target as the anchor element for the menu

    // Mark all notifications as read when the bell icon is clicked
    // @ts-ignore
    dispatch(markAllNotificationsAsRead());
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // Close the menu
  };

  const renderNotifications = () => {
    if (notifications.length > 0) {
      return notifications.map((notification: any, index: number) => (
        <div key={notification.id + notification.timestamp}>
          <MenuItem>
            <Typography variant='body2'>
              {notification.message} -{' '}
              {new Date(notification.timestamp).toLocaleTimeString()}
            </Typography>
          </MenuItem>
          {index < notifications.length - 1 && (
            <Divider
              key={`divider-${notification.id}-${notification.timestamp}`}
            />
          )}
        </div>
      ));
    } else {
      return (
        <MenuItem key='no-notifications' onClick={handleCloseMenu}>
          <Typography variant='body2'>No new notifications</Typography>
        </MenuItem>
      );
    }
  };

  return (
    <div>
      <IconButton
        color='default'
        onClick={handleOpenMenu}
        sx={{
          '&:focus, &:active': {
            outline: 'none', // Removes the default focus outline
            boxShadow: 'none', // Removes any active box shadow
          },
        }}
      >
        <Badge
          badgeContent={unreadCount}
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
        anchorEl={anchorEl} // Set the menu to anchor from the bell icon
        open={Boolean(anchorEl)} // Open if anchorEl is not null
        onClose={handleCloseMenu} // Close when clicking outside or menu item
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '300px',
          },
        }}
      >
        {renderNotifications()}
      </Menu>
    </div>
  );
};

export default NotificationBell;

import { Request, Response } from 'express';
import {
  createNotification,
  getNotifications,
  markAllNotificationsAsRead,
} from '../services/notificationService';

// Function to create a new notification
export const createNotificationController = async (
  req: Request,
  res: Response
) => {
  const { message } = req.body;

  try {
    const notification = await createNotification({ message });
    return res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get all notifications
export const getNotificationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const notifications = await getNotifications();
    return res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mark all notifications as read
export const markAllAsReadController = async (req: Request, res: Response) => {
  try {
    const updated = await markAllNotificationsAsRead();
    return res
      .status(200)
      .json({ message: 'All notifications marked as read', updated });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Failed to mark all notifications as read' });
  }
};

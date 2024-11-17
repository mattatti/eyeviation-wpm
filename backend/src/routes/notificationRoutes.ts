import { Router } from 'express';
import {
  createNotificationController,
  getNotificationsController,
  markAllAsReadController,
} from '../controllers/notificationController';

const router = Router();

// Create a new notification
router.post('/notifications', createNotificationController);

// Get all notifications
router.get('/notifications', getNotificationsController);

// Mark a notification as read
router.patch('/notifications/mark-as-read', markAllAsReadController);

export default router;

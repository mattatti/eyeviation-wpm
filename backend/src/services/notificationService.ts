import Notification from '../models/notification'; // Adjust the import based on where your model is located

interface NotificationPayload {
  message: string;
}

// Function for creating a notification
export const createNotification = async ({ message }: NotificationPayload) => {
  const notification = await Notification.create({
    message,
    timestamp: new Date(),
    is_read: false,
  });
  return notification;
};

// Function for getting all notifications
export const getNotifications = async () => {
  const notifications = await Notification.findAll({
    order: [['timestamp', 'DESC']], // Order by timestamp to show the latest notifications first
  });
  return notifications;
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  try {
    const updated = await Notification.update(
      { is_read: true },
      { where: { is_read: false } }
    );
    return updated;
  } catch (error) {
    throw new Error('Failed to mark all notifications as read');
  }
};

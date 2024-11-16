import { Request, Response } from 'express';
import { addAttachmentToBaseWeapon } from '../services/attachmentBaseWeaponService';

// Controller action to add an attachment to a base weapon
export const addAttachment = async (req: Request, res: Response) => {
  const { baseWeaponId, attachmentId } = req.body;

  try {
    await addAttachmentToBaseWeapon(baseWeaponId, attachmentId);
    return res.status(200).json({ message: 'Attachment added successfully' });
  } catch (error) {
    console.error('Error adding attachment:', error);
    return res.status(500).json({ error: 'Failed to add attachment' });
  }
};

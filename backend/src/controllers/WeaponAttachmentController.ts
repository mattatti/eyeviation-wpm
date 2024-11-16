import { Request, Response } from 'express';
import {
  addAttachmentToBaseWeapon,
  getAttachmentsForBaseWeapon,
} from '../services/attachmentBaseWeaponService'; // Assuming this service handles the logic

// Controller to manage weapon-attachment relationships
export class WeaponAttachmentController {
  // Add attachment to a base weapon
  static async addAttachment(req: Request, res: Response): Promise<Response> {
    const { baseWeaponId, attachmentId } = req.body;

    try {
      // Add the attachment to the base weapon
      await addAttachmentToBaseWeapon(baseWeaponId, attachmentId);
      return res.status(200).json({ message: 'Attachment added successfully' });
    } catch (error) {
      console.error('Error adding attachment:', error);
      return res.status(500).json({ error: 'Failed to add attachment' });
    }
  }

  // Get all attachments for a specific base weapon
  static async getAttachments(req: Request, res: Response): Promise<Response> {
    const { baseWeaponId } = req.params;

    try {
      // Retrieve the list of attachments for the specified base weapon
      const attachments = await getAttachmentsForBaseWeapon(baseWeaponId);
      return res.status(200).json(attachments);
    } catch (error) {
      console.error('Error fetching attachments:', error);
      return res.status(500).json({ error: 'Failed to retrieve attachments' });
    }
  }
}

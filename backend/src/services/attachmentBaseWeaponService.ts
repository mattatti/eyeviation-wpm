import Attachment from '../models/Attachment';
import { BaseWeapon } from '../models/baseWeapon';

// Add an attachment to a base weapon
export async function addAttachmentToBaseWeapon(
  baseWeaponId: string,
  attachmentId: string
) {
  const baseWeapon = await BaseWeapon.findByPk(baseWeaponId);
  const attachment = await Attachment.findByPk(attachmentId);

  if (!baseWeapon || !attachment) {
    throw new Error('Base weapon or attachment not found');
  }

  // This will create the association in the join table automatically
  await baseWeapon.addAttachment(attachment.id); // Automatically created method
}

// Get all attachments for a specific base weapon
export async function getAttachmentsForBaseWeapon(baseWeaponId: string) {
  const baseWeapon = await BaseWeapon.findByPk(baseWeaponId, {
    include: Attachment, // Include the associated attachments
  });

  if (!baseWeapon) {
    throw new Error('Base weapon not found');
  }

  // Use Sequelize's auto-generated method for getting associated attachments
  return baseWeapon.getAttachments(); // This returns the attached attachments
}

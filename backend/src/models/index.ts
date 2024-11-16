import Attachment from './Attachment';
import { AttachmentBaseWeapon } from './attachmentBaseWeapon';
import { BaseWeapon } from './baseWeapon';

// Initialize associations (already defined in the models themselves)
BaseWeapon.belongsToMany(Attachment, {
  through: AttachmentBaseWeapon,
  as: 'attachments',
  foreignKey: 'baseWeaponId',
});
Attachment.belongsToMany(BaseWeapon, {
  through: AttachmentBaseWeapon,
  as: 'compatibleWeapons',
  foreignKey: 'attachmentId',
});

export { Attachment, AttachmentBaseWeapon, BaseWeapon };

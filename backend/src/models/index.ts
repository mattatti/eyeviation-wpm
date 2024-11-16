import Attachment from './Attachment';
import { AttachmentBaseWeapon } from './attachmentBaseWeapon';
import { BaseWeapon } from './baseWeapon';

// Initialize associations (already defined in the models themselves)
BaseWeapon.belongsToMany(Attachment, {
  through: AttachmentBaseWeapon,
  foreignKey: 'baseWeaponId',
});
Attachment.belongsToMany(BaseWeapon, {
  through: AttachmentBaseWeapon,
  foreignKey: 'attachmentId',
});

export { Attachment, AttachmentBaseWeapon, BaseWeapon };

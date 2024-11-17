import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Attachment } from './Attachment';
import { BaseWeapon } from './baseWeapon';

// Define the join table
const AttachmentBaseWeapon = sequelize.define(
  'AttachmentBaseWeapon',
  {
    baseWeaponId: {
      type: DataTypes.STRING,
      references: {
        model: BaseWeapon,
        key: 'id',
      },
    },
    attachmentId: {
      type: DataTypes.STRING,
      references: {
        model: Attachment,
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for current timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for current timestamp
    },
  },
  {
    tableName: 'AttachmentBaseWeapon',
    timestamps: true, // Enables `createdAt` and `updatedAt`
  }
);

export { AttachmentBaseWeapon };

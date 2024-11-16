import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export interface WeaponParts {
  sight: string;
  laserPointer: string;
  gripHandle: string;
  barrelAttachment: string;
}

export interface CustomizedWeaponAttributes {
  id?: number;
  baseWeapon: string;
  parts: WeaponParts;
  sentToPrinter: boolean;
  createdAt?: Date;
}

export class CustomizedWeapon extends Model<CustomizedWeaponAttributes> {}

CustomizedWeapon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    baseWeapon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parts: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    sentToPrinter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: 'CustomizedWeapon', tableName: 'weapons' }
);

export default CustomizedWeapon;

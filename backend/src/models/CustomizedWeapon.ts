// models/CustomizedWeapon.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { BaseWeapon } from './baseWeapon';

export interface WeaponParts {
  sight: string;
  laserPointer: string;
  gripHandle: string;
  barrelAttachment: string;
}

export interface CustomizedWeaponAttributes {
  id?: number;
  baseWeapon: string; // References a BaseWeapon's ID
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
      references: {
        model: BaseWeapon,
        key: 'id',
      },
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
  { sequelize, modelName: 'CustomizedWeapon', tableName: 'customized_weapons' }
);

// You may want to establish relationships for fetching data later
BaseWeapon.hasMany(CustomizedWeapon, { foreignKey: 'baseWeapon' });
CustomizedWeapon.belongsTo(BaseWeapon, { foreignKey: 'baseWeapon' });

export default CustomizedWeapon;

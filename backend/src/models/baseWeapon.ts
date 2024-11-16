import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import Attachment from './Attachment';

interface BaseWeaponAttributes {
  id: string;
  name: string;
}

interface BaseWeaponCreationAttributes
  extends Optional<BaseWeaponAttributes, 'id'> {}

class BaseWeapon extends Model<
  BaseWeaponAttributes,
  BaseWeaponCreationAttributes
> {
  public id!: string;
  public name!: string;

  // Add the types for the auto-generated Sequelize methods
  public addAttachment!: (attachmentId: string) => Promise<void>;
  public getAttachments!: () => Promise<Attachment[]>; // Return type is an array of Attachment instances
}

BaseWeapon.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'BaseWeapon', tableName: 'baseWeapons' }
);

export { BaseWeapon };

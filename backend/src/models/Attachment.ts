import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Attachment extends Model {
  public id!: string;
  public name!: string;
  public type!: string;
}

Attachment.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Attachment',
    tableName: 'attachments',
    timestamps: true,
  }
);

export default Attachment;

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface AttachmentAttributes {
  id: string;
  name: string;
  type: string;
  image_url: string;
}

interface AttachmentCreationAttributes
  extends Optional<AttachmentAttributes, 'id'> {}

class Attachment extends Model<
  AttachmentAttributes,
  AttachmentCreationAttributes
> {
  public id!: string;
  public name!: string;
  public type!: string;
  public image_url!: string;
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
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Attachment',
    tableName: 'attachments',
    timestamps: true,
  }
);

export { Attachment };

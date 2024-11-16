import CustomizedWeapon, {
  CustomizedWeaponAttributes,
} from '../models/CustomizedWeapon';

export const createWeapon = async (data: CustomizedWeaponAttributes) => {
  return await CustomizedWeapon.create(data);
};

export const getAllWeapons = async () => {
  return await CustomizedWeapon.findAll();
};

export const deleteWeapon = async (id: number) => {
  const weapon = await CustomizedWeapon.findByPk(id);
  if (!weapon) throw new Error('Weapon not found');
  await weapon.destroy();
};

export const printWeapon = async (id: string) => {
  const weapon = await CustomizedWeapon.findByPk(id);
  if (!weapon) throw new Error('Weapon not found');

  await weapon.update({ sentToPrinter: true });
  return weapon;
};

// services/weaponService.ts

import { Attachment, BaseWeapon } from '../models';

// Get all base weapons
export const getAllBaseWeapons = async () => {
  try {
    return await BaseWeapon.findAll();
  } catch (error) {
    throw new Error('Failed to fetch base weapons');
  }
};

export const getAttachmentsByTypeService = async (
  type: string,
  weaponId: string
) => {
  try {
    // Find all attachments of a specific type that are compatible with the given weapon
    return await Attachment.findAll({
      where: { type },
      include: [
        {
          model: BaseWeapon,
          as: 'compatibleWeapons', // Alias defined in the relationship
          where: { id: weaponId },
          attributes: [], // Exclude weapon data in the response, only filter by it
        },
      ],
    });
  } catch (error) {
    throw new Error('Failed to fetch attachments');
  }
};

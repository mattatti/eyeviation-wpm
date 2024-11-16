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

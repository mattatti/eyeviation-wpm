import { Request, Response } from 'express';
import {
  createWeapon,
  deleteWeapon,
  getAllWeapons,
  printWeapon,
} from '../services/weaponService';

export const createWeaponController = async (req: Request, res: Response) => {
  try {
    const weapon = await createWeapon(req.body);
    res.status(201).json(weapon);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getWeaponsController = async (req: Request, res: Response) => {
  try {
    const weapons = await getAllWeapons();
    res.json(weapons);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWeaponController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteWeapon(Number(id));
    res.json({ message: 'Weapon deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const printWeaponController = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const weapon: any = await printWeapon(id);
    console.log(`Weapon ID ${id} (${weapon.baseWeapon}) sent to printer`);
    res.json({ message: `${weapon.baseWeapon} sent to printer`, weapon });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

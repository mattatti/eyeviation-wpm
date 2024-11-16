import { Request, Response } from 'express';
import { Attachment, BaseWeapon } from '../models';
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

// controllers/weaponController.ts

// Get the list of all base weapons
export const getBaseWeapons = async (req: Request, res: Response) => {
  try {
    const baseWeapons = await BaseWeapon.findAll();
    res.status(200).json(baseWeapons);
  } catch (error) {
    console.error('Error fetching base weapons:', error);
    res.status(500).json({ message: 'Failed to fetch base weapons' });
  }
};

// Get attachments for each type
export const getAttachmentsByType = async (req: Request, res: Response) => {
  try {
    const attachmentType = req.params.type; // Extract the attachment type from the route
    const attachments = await Attachment.findAll({
      where: { type: attachmentType },
    });

    res.status(200).json(attachments);
  } catch (error) {
    console.error('Error fetching attachments:', error);
    res.status(500).json({ message: 'Failed to fetch attachments' });
  }
};

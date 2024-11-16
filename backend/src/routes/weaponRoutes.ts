import express from 'express';
import {
  createWeaponController,
  deleteWeaponController,
  getAttachmentsByType,
  getBaseWeapons,
  getWeaponsController,
  printWeaponController,
} from '../controllers/weaponController';

const router = express.Router();

router.post('/customize', createWeaponController);
router.get('/customize', getWeaponsController);
router.delete('/customize/:id', deleteWeaponController);
router.post('/customize/print', printWeaponController);
router.get('/base-weapons', getBaseWeapons);
router.get('/attachments/:type', getAttachmentsByType);
export default router;

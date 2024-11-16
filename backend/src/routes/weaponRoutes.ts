import express from 'express';
import {
  createWeaponController,
  deleteWeaponController,
  getWeaponsController,
  printWeaponController,
} from '../controllers/weaponController';

const router = express.Router();

router.post('/customize', createWeaponController);
router.get('/customize', getWeaponsController);
router.delete('/customize/:id', deleteWeaponController);
router.post('/customize/print', printWeaponController);

export default router;

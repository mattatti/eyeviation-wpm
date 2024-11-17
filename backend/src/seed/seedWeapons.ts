import { sequelize } from '../config/db';
import { Attachment, BaseWeapon } from '../models';

// Define the weaponsData structure
export const weaponsData = {
  baseWeapons: [
    { id: 'Glock 17', name: 'Glock 17' },
    { id: 'M4', name: 'M4' },
    { id: 'FN Minimi', name: 'FN Minimi' },
  ],
  sights: [
    {
      id: 'Mepro - MPO PRO-F',
      name: 'Mepro - MPO PRO-F',
      type: 'sight',
      compatibleWith: ['Glock 17'],
    },
    {
      id: 'Mepro - Hunter 4x',
      name: 'Mepro - Hunter 4x',
      type: 'sight',
      compatibleWith: ['M4'],
    },
    {
      id: 'Mepro - MMX 3',
      name: 'Mepro - MMX 3',
      type: 'sight',
      compatibleWith: ['M4', 'FN Minimi'],
    },
  ],
  laserPointers: [
    {
      id: 'Nightstick - TSM11G',
      name: 'Nightstick - TSM11G',
      type: 'laser pointer',
      compatibleWith: ['Glock 17'],
    },
    {
      id: 'Wilcox - RAAM GSS',
      name: 'Wilcox - RAAM GSS',
      type: 'laser pointer',
      compatibleWith: ['M4'],
    },
    {
      id: 'Wilcox - Raid Xe',
      name: 'Wilcox - Raid Xe',
      type: 'laser pointer',
      compatibleWith: ['FN Minimi'],
    },
  ],
  gripHandles: [
    {
      id: 'MCK - Micro Conversion Kit Gen 2',
      name: 'MCK - Micro Conversion Kit Gen 2',
      type: 'grip handle',
      compatibleWith: ['Glock 17'],
    },
    {
      id: 'Law - Grip-Pod Forgerip',
      name: 'Law - Grip-Pod Forgerip',
      type: 'grip handle',
      compatibleWith: ['M4'],
    },
    {
      id: 'BravoCo - Vertical Grip Mod 3',
      name: 'BravoCo - Vertical Grip Mod 3',
      type: 'grip handle',
      compatibleWith: ['FN Minimi'],
    },
  ],
  barrelAttachments: [
    {
      id: 'Banish - Banish 45',
      name: 'Banish - Banish 45',
      type: 'barrel attachment',
      compatibleWith: ['Glock 17'],
    },
    {
      id: 'Midwest - Muzzle Break',
      name: 'Midwest - Muzzle Break',
      type: 'barrel attachment',
      compatibleWith: ['M4'],
    },
    {
      id: 'Midwest - Blast Diverter',
      name: 'Midwest - Blast Diverter',
      type: 'barrel attachment',
      compatibleWith: ['FN Minimi'],
    },
  ],
};

// Insert base weapons
const insertBaseWeapons = async () => {
  for (const weapon of weaponsData.baseWeapons) {
    const existingWeapon = await BaseWeapon.findByPk(weapon.id); // Check if the weapon already exists
    if (!existingWeapon) {
      await BaseWeapon.create({
        id: weapon.id,
        name: weapon.name,
      });
    }
  }
};

// Insert attachments
const insertAttachments = async (attachmentsData: any[]) => {
  for (const attachment of attachmentsData) {
    const existingAttachment = await Attachment.findByPk(attachment.id); // Check if the attachment already exists
    if (!existingAttachment) {
      const newAttachment = await Attachment.create({
        id: attachment.id,
        name: attachment.name,
        type: attachment.type,
      });

      // Create the relationship with baseWeapons
      for (const baseWeaponId of attachment.compatibleWith) {
        const baseWeapon = await BaseWeapon.findByPk(baseWeaponId);
        if (baseWeapon) {
          await baseWeapon.addAttachment(newAttachment.id); // Assuming this association method exists
        }
      }
    }
  }
};

// Insert all attachments (sights, laser pointers, grip handles, barrel attachments)
const insertAllAttachments = async () => {
  await insertAttachments(weaponsData.sights);
  await insertAttachments(weaponsData.laserPointers);
  await insertAttachments(weaponsData.gripHandles);
  await insertAttachments(weaponsData.barrelAttachments);
};

// Execute all inserts
export const insertData = async () => {
  try {
    // Synchronize models without dropping tables
    await sequelize.sync({ force: false }); // Ensure force is false to avoid resetting the DB

    // Insert base weapons and attachments only if they don't already exist
    await insertBaseWeapons(); // Insert base weapons if they don't exist
    await insertAllAttachments(); // Insert all attachments if they don't exist

    console.info('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

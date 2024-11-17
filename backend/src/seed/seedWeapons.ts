import { sequelize } from '../config/db';
import { Attachment, BaseWeapon } from '../models';

// Define the weaponsData structure
export const weaponsData = {
  baseWeapons: [
    {
      id: 'Glock 17',
      name: 'Glock 17',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/4/4b/GLOCK_17_Gen_4_Pistol_MOD_45160304.jpg',
    },
    {
      id: 'M4',
      name: 'M4',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Coltm4a1.jpeg/1920px-Coltm4a1.jpeg',
    },
    {
      id: 'FN Minimi',
      name: 'FN Minimi',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/4/4c/FN_MINIMI_Standard_Right.jpg',
    },
  ],
  sights: [
    {
      id: 'Mepro - MPO PRO-F',
      name: 'Mepro - MPO PRO-F',
      type: 'sight',
      compatibleWith: ['Glock 17'],
      image_url:
        'https://www.meprolight.com/wp-content/uploads/2024/07/MEPRO-MPO-PRO-F-Red-3-33-MOA-Bullseye-RMR-901141272-810013524536-websize-clear-1-1-100x100.webp',
    },
    {
      id: 'Mepro - Hunter 4x',
      name: 'Mepro - Hunter 4x',
      type: 'sight',
      compatibleWith: ['M4'],
      image_url:
        'https://www.meprolight.com/wp-content/uploads/2024/07/HUNTER-X4-1-100x100.png',
    },
    {
      id: 'Mepro - MMX 3',
      name: 'Mepro - MMX 3',
      type: 'sight',
      compatibleWith: ['M4', 'FN Minimi'],
      image_url:
        'https://www.meprolight.com/wp-content/uploads/2024/07/mmx3-main-100x100.png',
    },
  ],
  laserPointers: [
    {
      id: 'Nightstick - TSM11G',
      name: 'Nightstick - TSM11G',
      type: 'laser pointer',
      compatibleWith: ['Glock 17'],
      image_url:
        'https://cdn11.bigcommerce.com/s-mbf0s90jm7/images/stencil/500x350/products/935656/2475434/1a9f653d667823fc1557720d41e5c5d57f800d57_00017398807654_1_bigcommerce__60494.1725644205.jpg?c=2',
    },
    {
      id: 'Wilcox - RAAM GSS',
      name: 'Wilcox - RAAM GSS',
      type: 'laser pointer',
      compatibleWith: ['M4'],
      image_url:
        'https://ownthenight.com/media/catalog/product/cache/d135a4e68b41d426360edd6489238fa5/w/i/wilcox-combat-systems-raaam-gss_5.png',
    },
    {
      id: 'Wilcox - Raid Xe',
      name: 'Wilcox - Raid Xe',
      type: 'laser pointer',
      compatibleWith: ['FN Minimi'],
      image_url:
        'https://ownthenight.com/media/catalog/product/cache/d135a4e68b41d426360edd6489238fa5/w/i/wilcox-combat-systems-raid-xe_front.png',
    },
  ],
  gripHandles: [
    {
      id: 'MCK - Micro Conversion Kit Gen 2',
      name: 'MCK - Micro Conversion Kit Gen 2',
      type: 'grip handle',
      compatibleWith: ['Glock 17'],
      image_url:
        'https://cdn11.bigcommerce.com/s-yigphekoqi/images/stencil/1280x1280/products/394/4481/caa-mck-gen-2-or-micro-conversion-kit-gen-2.0-glock-17-19-19x-22-23-31-32-45__84645.1694210005.jpg?c=2',
    },
    {
      id: 'Law - Grip-Pod Forgerip',
      name: 'Law - Grip-Pod Forgerip',
      type: 'grip handle',
      compatibleWith: ['M4'],
      image_url:
        'https://cdn.at3tactical.com/wp-content/uploads/Grip-Pod-AR-15-Law-Enforcement-Vertical-Forward-Grip-Cam-Lever-GPS-LE-CL-2.jpg',
    },
    {
      id: 'BravoCo - Vertical Grip Mod 3',
      name: 'BravoCo - Vertical Grip Mod 3',
      type: 'grip handle',
      compatibleWith: ['FN Minimi'],
      image_url:
        'https://cdn11.bigcommerce.com/s-r463nwv5z/images/stencil/500x659/products/1088/5797/BCM-VG-1913-MOD-3-BLK_1_HR__49688.1636166682.jpg?c=2',
    },
  ],
  barrelAttachments: [
    {
      id: 'Banish - Banish 45',
      name: 'Banish - Banish 45',
      type: 'barrel attachment',
      compatibleWith: ['Glock 17'],
      image_url:
        'https://www.silencercentral.com/media/catalog/product/cache/88d6312c87043b2a51d7d674a1fff9ea/b/a/banish45_8.6_2up-e1619557464771.png',
    },
    {
      id: 'Midwest - Muzzle Break',
      name: 'Midwest - Muzzle Break',
      type: 'barrel attachment',
      compatibleWith: ['M4'],
      image_url:
        'https://cdn11.bigcommerce.com/s-v9wzb8m8hv/images/stencil/500x659/products/1154/16623/MI-MB4-1__30245.1621542657.jpg?c=1',
    },
    {
      id: 'Midwest - Blast Diverter',
      name: 'Midwest - Blast Diverter',
      type: 'barrel attachment',
      compatibleWith: ['FN Minimi'],
      image_url:
        'https://cdn11.bigcommerce.com/s-bnjylkrvq1/images/stencil/500x659/products/1563/2066/MI-PBD-2__18469.1729878527.jpg?c=1',
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
        image_url: weapon.image_url,
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
        image_url: attachment.image_url,
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

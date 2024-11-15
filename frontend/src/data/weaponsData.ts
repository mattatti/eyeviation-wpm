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
      compatibleWith: ['Glock 17'],
    },
    {
      id: 'Mepro - Hunter 4x',
      name: 'Mepro - Hunter 4x',
      compatibleWith: ['M4'],
    },
    {
      id: 'Mepro - MMX 3',
      name: 'Mepro - MMX 3',
      compatibleWith: ['M4', 'FN Minimi'],
    },
  ],
  laserPointers: [
    {
      id: 'Nightstick - TSM11G',
      name: 'Nightstick - TSM11G',
      compatibleWith: ['Glock 17'],
    },
    {
      id: 'Wilcox - RAAM GSS',
      name: 'Wilcox - RAAM GSS',
      compatibleWith: ['M4'],
    },
    {
      id: 'Wilcox - Raid Xe',
      name: 'Wilcox - Raid Xe',
      compatibleWith: ['FN Minimi'],
    },
  ],
  gripHandles: [
    {
      id: 'MCK - Micro Conversion Kit Gen 2',
      name: 'MCK - Micro Conversion Kit Gen 2',
      compatibleWith: ['Glock 17'],
    },
    {
      id: 'Law - Grip-Pod Forgerip',
      name: 'Law - Grip-Pod Forgerip',
      compatibleWith: ['M4'],
    },
    {
      id: 'BravoCo - Vertical Grip Mod 3',
      name: 'BravoCo - Vertical Grip Mod 3',
      compatibleWith: ['FN Minimi'],
    },
  ],
  barrelAttachments: [
    {
      id: 'Banish - Banish 45',
      name: 'Banish - Banish 45',
      compatibleWith: ['Glock 17'],
    },
    {
      id: 'Midwest - Muzzle Break',
      name: 'Midwest - Muzzle Break',
      compatibleWith: ['M4'],
    },
    {
      id: 'Midwest - Blast Diverter',
      name: 'Midwest - Blast Diverter',
      compatibleWith: ['FN Minimi'],
    },
  ],
};

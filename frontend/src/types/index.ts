export interface WeaponParts {
  sight: string;
  laserPointer: string;
  gripHandle: string;
  barrelAttachment: string;
}

export interface CustomizedWeapon {
  id: number;
  baseWeapon: string;
  parts: WeaponParts;
  sentToPrinter: boolean;
}

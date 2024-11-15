import express, { Request, Response } from 'express';

const app = express();
const PORT = 5000;

app.use(express.json());

interface WeaponParts {
  sight: string;
  laserPointer: string;
  gripHandle: string;
  barrelAttachment: string;
}

interface CustomizedWeapon {
  id: number;
  baseWeapon: string;
  parts: WeaponParts;
  sentToPrinter: boolean;
}

let weapons: CustomizedWeapon[] = [];
let idCounter = 1;

// POST /customize
app.post('/customize', (req: Request, res: Response) => {
  const {
    baseWeapon,
    parts,
    sendToPrinter,
  }: { baseWeapon: string; parts: WeaponParts; sendToPrinter: boolean } =
    req.body;

  const newWeapon: CustomizedWeapon = {
    id: idCounter++,
    baseWeapon,
    parts,
    sentToPrinter: !!sendToPrinter,
  };

  weapons.push(newWeapon);

  if (sendToPrinter) {
    console.log(`Weapon ID ${newWeapon.id} sent to printer`);
  }

  res.status(201).json(newWeapon);
});

// GET /customize
app.get('/customize', (req: Request, res: Response) => {
  res.json(weapons);
});

// POST /printer
app.post('/printer', (req: Request, res: Response) => {
  const { id }: { id: number } = req.body;
  const weapon = weapons.find((w) => w.id === id);

  if (!weapon) {
    return res.status(404).json({ error: 'Weapon not found' });
  }

  weapon.sentToPrinter = true;
  res.json({ message: `Weapon ID ${id} sent to printer` });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import cors from 'cors';
import express, { Request, Response } from 'express';
const app = express();
const PORT = 5000;

app.use(cors());
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
  createdAt: string;
}

let weapons: CustomizedWeapon[] = [];
let idCounter = 1;

// POST /customize - Customize a weapon and optionally send it to the printer
app.post('/customize', (req: Request, res: Response) => {
  const {
    baseWeapon,
    parts,
    sendToPrinter,
  }: { baseWeapon: string; parts: WeaponParts; sendToPrinter: boolean } =
    req.body;

  const newWeapon: CustomizedWeapon = {
    id: idCounter++, //TODO: generateUniqueId(),
    baseWeapon,
    parts,
    sentToPrinter: !!sendToPrinter,
    createdAt: new Date().toISOString(),
  };

  weapons.push(newWeapon);

  if (sendToPrinter) {
    console.log(`Weapon ID ${newWeapon.id} sent to printer`);
  }

  res.status(201).json(newWeapon);
});

// GET /customize - Retrieve all customized weapons
app.get('/customize', (req: Request, res: Response) => {
  res.json(weapons);
});

// POST /customize/print - Trigger printing of an existing weapon
app.post('/customize/print', (req: Request, res: Response) => {
  const { id }: { id: number } = req.body;
  const weapon = weapons.find((w) => w.id === id);

  if (!weapon) {
    return res.status(404).json({ error: 'Weapon not found' });
  }

  weapon.sentToPrinter = true;
  console.log(`${weapon.baseWeapon} sent to printer`);

  res.json({ message: `${weapon.baseWeapon} sent to printer` });
});

// Example Express.js route handler
app.delete('/customize/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Assuming a delete function exists in your database logic
    await deleteWeaponById(id);
    res.status(200).json({ message: 'Weapon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete weapon', error });
  }
});

// Example Express.js route handler
app.put('/customize/:id', async (req, res) => {
  const { id } = req.params;
  const updatedWeapon = req.body; // Assuming the updated weapon details are in the request body

  try {
    // Assuming an update function exists in your database logic
    const weapon = await updateWeaponById(id, updatedWeapon);
    res.status(200).json({ message: 'Weapon updated successfully', weapon });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update weapon', error });
  }
});
//TODO: add db
// Dummy functions to simulate DB operations
const deleteWeaponById = async (id: string) => {
  // Perform the deletion from DB
  console.log(`Weapon with ID: ${id} deleted`);
};

const updateWeaponById = async (
  id: string,
  updatedWeapon: CustomizedWeapon
) => {
  // Perform the update in DB
  console.log(`Weapon with ID: ${id} updated`, updatedWeapon);
  return { updatedWeapon }; // Simulate returned updated weapon
};
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

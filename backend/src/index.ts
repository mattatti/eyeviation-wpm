import cors from 'cors';
import express from 'express';
import { sequelize } from './config/db';
import notificationRoutes from './routes/notificationRoutes'; // Adjust the path as necessary
import weaponRoutes from './routes/weaponRoutes';
import { insertData } from './seed/seedWeapons';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', weaponRoutes);
app.use('/api', notificationRoutes);

// Sync the database and insert data after connection is successful
sequelize
  .sync({ force: false }) // Use `force: true` for recreating the tables during development, but avoid in production
  .then(async () => {
    console.log('Database connected');

    // Insert seed data after the DB connection is established
    try {
      await insertData(); // Call the seed function
      console.log('Data inserted successfully!');
    } catch (error) {
      console.error('Error inserting data:', error);
    }

    // Start the server after seeding is done
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('Database connection failed:', error));

import cors from 'cors';
import express from 'express';
import { sequelize } from './config/db';
import weaponRoutes from './routes/weaponRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', weaponRoutes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('Database connection failed:', error));

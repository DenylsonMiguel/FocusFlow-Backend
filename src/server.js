import express from 'express';
const app = express();
import cors from 'cors';
import helmet from 'helmet';
import registerRoutes from './modules/v0/routes.js';

app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use(helmet());

registerRoutes(app);

export default app;
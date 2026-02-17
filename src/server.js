import express from 'express';
const app = express();
import cors from 'cors';
import helmet from 'helmet';
import registerRoutes from './modules/v0/routes.js';
import morgan from 'morgan';

app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use(helmet());
app.use(morgan('combined'));

registerRoutes(app);

export default app;
import app from './src/server.js';
import "dotenv/config";
import './src/config/db.js';

if (!process.env.PORT) {
  throw new Error('PORT environment variable is not defined');
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
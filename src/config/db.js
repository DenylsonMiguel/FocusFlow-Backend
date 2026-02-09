import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.DB_URI;
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => { console.error('MongoDB connection error:', err); process.exit(1); });

export default mongoose;
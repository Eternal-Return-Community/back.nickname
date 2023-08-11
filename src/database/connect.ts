import mongoose from "mongoose";

export default function connect() {
  if (!process.env.DATABASE) throw new Error('Add database URL in .env');
  mongoose.connect(process.env.DATABASE)
    .then(() => console.log('Database is online!'))
    .catch(e => console.error(e));
}
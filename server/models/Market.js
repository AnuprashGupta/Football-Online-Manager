import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({
  player: { type: String, required: true },
  team: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model('Market', marketSchema);

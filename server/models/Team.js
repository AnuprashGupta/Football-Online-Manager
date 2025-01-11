import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  budget: { type: Number, default: 5000000 },
  players: [
    {
      name: String,
      role: String,
      price: Number,
    },
  ],
});

export default mongoose.model('Team', teamSchema);

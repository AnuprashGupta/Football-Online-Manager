// backend/controllers/marketController.js
import { transferMarket, teams } from "../data.js";
import Market from '../models/Market.js';
import Team from '../models/Team.js';


export const getMarket = async (req, res) => {
  const { team, player, price } = req.query;

  let filter = {};

  if (team) filter.team = { $regex: `^${team}$`, $options: 'i' };  // Exact match, case-insensitive
  if (player) filter.player = { $regex: `^${player}$`, $options: 'i' };
  if (price) filter.price = { $lte: parseFloat(price) };  // Ensure price is a number

  console.log("Applied Filter:", filter);

  try {
    const marketListings = await Market.find(filter);
    res.status(200).json(marketListings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market data.' });
  }
};



export const addPlayerToMarket = async (req, res) => {
  const { player, price } = req.body;
  const userEmail = req.user.email;

  const team = await Team.findOne({ userEmail });
  if (!team || !team.players.some(p => p.name === player)) {
    return res.status(400).json({ error: 'Player not in team.' });
  }

  const marketEntry = new Market({ player, team: userEmail, price });
  await marketEntry.save();

  res.status(201).json({ message: 'Player added to transfer market.' });
};

export const buyPlayer = async (req, res) => {
  const { player } = req.body;
  const userEmail = req.user.email;

  const listing = await Market.findOne({ player });
  if (!listing) return res.status(404).json({ error: 'Player not found in market.' });

  const buyerTeam = await Team.findOne({ userEmail });
  const cost = listing.price * 0.95;

  if (buyerTeam.budget < cost) {
    return res.status(400).json({ error: 'Insufficient budget.' });
  }

  buyerTeam.budget -= cost;
  buyerTeam.players.push({ name: player, role: 'unknown', price: listing.price });
  await buyerTeam.save();

  await Market.deleteOne({ player });
  res.status(200).json({ message: 'Player purchased successfully.' });
};

// Remove a player from the transfer market
export const removePlayerFromMarket = async (req, res) => {
  const { player } = req.body;
  const userEmail = req.user.email;

  try {
    const listing = await Market.findOne({ player, team: userEmail });
    if (!listing) {
      return res.status(404).json({ error: 'Player not found in the market or unauthorized.' });
    }

    await Market.deleteOne({ player, team: userEmail });
    res.status(200).json({ message: 'Player removed from the transfer market.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove player from the market.' });
  }
};





// backend/controllers/marketController.js
import { transferMarket, teams } from "../data.js";



// Get all players in the transfer market with filters
export const getMarket = (req, res) => {
  const { team, player, price } = req.query;

  let filteredMarket = transferMarket;
  if (team) filteredMarket = filteredMarket.filter(t => t.team.toLowerCase().includes(team.toLowerCase()));
  if (player) filteredMarket = filteredMarket.filter(t => t.player.toLowerCase().includes(player.toLowerCase()));
  if (price) filteredMarket = filteredMarket.filter(t => t.price <= parseFloat(price));

  return res.status(200).json(filteredMarket);
};

// Add a player to the transfer market
export const addPlayerToMarket = (req, res) => {
  const { player, price } = req.body;
  const userEmail = req.user.email;

  const userTeam = teams.find(t => t.userEmail === userEmail);
  if (!userTeam || !userTeam.players.some(p => p.name === player)) {
    return res.status(400).json({ error: "Player not in team or invalid team." });
  }

  if (transferMarket.some(t => t.player === player)) {
    return res.status(400).json({ error: "Player already listed in the market." });
  }

  transferMarket.push({
    team: userEmail,
    player,
    price: parseFloat(price),
  });

  return res.status(201).json({ message: "Player added to the transfer market." });
};

// Remove a player from the transfer market
export const removePlayerFromMarket = (req, res) => {
  const { player } = req.body;
  const userEmail = req.user.email;

  const listingIndex = transferMarket.findIndex(t => t.player === player && t.team === userEmail);
  if (listingIndex === -1) {
    return res.status(404).json({ error: "Player not found in the market or unauthorized." });
  }

  transferMarket.splice(listingIndex, 1);
  return res.status(200).json({ message: "Player removed from the transfer market." });
};

// Buy a player from the transfer market
export const buyPlayer = (req, res) => {
  const { player } = req.body;
  const userEmail = req.user.email;

  const buyerTeam = teams.find(t => t.userEmail === userEmail);
  const listing = transferMarket.find(t => t.player === player);

  if (!listing) {
    return res.status(404).json({ error: "Player not found in the market." });
  }

  if (listing.team === userEmail) {
    return res.status(400).json({ error: "Cannot buy your own player." });
  }

  const purchasePrice = listing.price * 0.95;
  if (buyerTeam.budget < purchasePrice) {
    return res.status(400).json({ error: "Insufficient budget." });
  }

  // Deduct buyer's budget
  buyerTeam.budget -= purchasePrice;
  buyerTeam.players.push({ name: player, role: "unknown", price: listing.price });

  // Remove player from seller's team
  const sellerTeam = teams.find(t => t.userEmail === listing.team);
  if (sellerTeam) {
    sellerTeam.players = sellerTeam.players.filter(p => p.name !== player);
  }

  // Remove player from the market
  transferMarket.splice(transferMarket.indexOf(listing), 1);

  return res.status(200).json({ message: "Player purchased successfully." });
};


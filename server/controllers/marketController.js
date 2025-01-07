// backend/controllers/marketController.js
const transferMarket = [];
const teams = [];

export const getMarket = (req, res) => {
  const { team, player, price } = req.query;
  let filtered = transferMarket;

  if (team) filtered = filtered.filter(t => t.team.includes(team));
  if (player) filtered = filtered.filter(t => t.player.includes(player));
  if (price) filtered = filtered.filter(t => t.price <= price);

  res.json(filtered);
};

export const addPlayerToMarket = (req, res) => {
  const { player, price } = req.body;
  const userEmail = req.user.email;
  const userTeam = teams.find(t => t.userEmail === userEmail);

  if (!userTeam || !userTeam.players.some(p => p.name === player)) {
    return res.status(400).json({ error: "Player not in team." });
  }

  transferMarket.push({
    team: userEmail,
    player,
    price
  });

  res.status(201).json({ message: "Player added to transfer market." });
};

export const buyPlayer = (req, res) => {
  const { player } = req.body;
  const userEmail = req.user.email;
  const userTeam = teams.find(t => t.userEmail === userEmail);

  const listing = transferMarket.find(t => t.player === player);
  if (!listing) {
    return res.status(404).json({ error: "Player not found in market." });
  }

  const cost = listing.price * 0.95;
  if (userTeam.budget < cost) {
    return res.status(400).json({ error: "Insufficient budget." });
  }

  userTeam.budget -= cost;
  userTeam.players.push({ name: player, role: "unknown", price: cost });

  // Remove player from seller's team
  const sellerTeam = teams.find(t => t.userEmail === listing.team);
  sellerTeam.players = sellerTeam.players.filter(p => p.name !== player);

  // Remove from transfer market
  transferMarket.splice(transferMarket.indexOf(listing), 1);

  res.status(200).json({ message: "Player purchased successfully." });
};
import Team from '../models/Team.js';

export const getTeam = async (req, res) => {
  const userEmail = req.user.email;

  const team = await Team.findOne({ userEmail });
  if (!team) return res.status(404).json({ error: 'Team not found.' });

  res.json(team);
};

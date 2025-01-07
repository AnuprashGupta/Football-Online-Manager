// backend/controllers/teamController.js
const teams = [];

export const getTeam = (req, res) => {
  const userEmail = req.user.email;
  const team = teams.find(t => t.userEmail === userEmail);
  if (!team) return res.status(404).json({ error: "Team not found." });
  res.json(team);
};

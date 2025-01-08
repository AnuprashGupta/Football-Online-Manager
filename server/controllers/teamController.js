import { teams } from "../data.js";

export const getTeam = (req, res) => {
  const userEmail = req.user.email;
  const team = teams.find(t => t.userEmail === userEmail);
  if (!team) return res.status(404).json({ error: "Team not found." });
  res.json(team);
};
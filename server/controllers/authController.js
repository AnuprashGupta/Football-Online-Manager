// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import { generatePlayers, INITIAL_BUDGET } from '../utils/helperFunctions.js';
import { users, teams } from '../data.js';
const SECRET = process.env.JWT_SECRET || "football_manager_secret";


export const loginOrRegister = async (req, res) => {
  const { email, password } = req.body;

  let user = users.find(u => u.email === email);
  if (!user) {
    // Register user
    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    users.push({ email, password, token });

    // Create team immediately
    const team = {
      userEmail: email,
      budget: INITIAL_BUDGET,
      players: generatePlayers(),
    };
    teams.push(team);

    return res.status(201).json({ token, message: "User registered successfully." });
  }

  // Login user
  if (user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
  user.token = token;
  return res.status(200).json({ token, message: "User logged in successfully." });
};


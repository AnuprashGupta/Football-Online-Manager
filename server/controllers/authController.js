import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Team from '../models/Team.js';
import { generatePlayers, INITIAL_BUDGET } from '../utils/helperFunctions.js';

export const loginOrRegister = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword });
    await user.save();

    const team = new Team({
      userEmail: email,
      budget: INITIAL_BUDGET,
      players: generatePlayers(),
    });
    await team.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ token, message: 'User registered successfully.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ token, message: 'User logged in successfully.' });
};

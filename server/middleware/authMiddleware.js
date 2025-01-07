// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "football_manager_secret";

export const authenticate = (req, res, next) => {

  const token = req.headers.authorization;
  console.log("--->token", token)
  if (!token) return res.status(401).json({ error: "Unauthorized." });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { User } from '../interfaces/user';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || '';
// users imported from data/users

// Login endpoint
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const filePath = path.join(__dirname, '../data/users.json');
  let users: User[] = [];
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      users = JSON.parse(data);
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error reading user data.' });
  }
  const user = users.find((u: User) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;

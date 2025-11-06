import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Registration endpoint
router.post('/', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
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
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists.' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const validRoles = ['uporabnik', 'trener', 'admin'];
  const newUser: User = {
    id: uuidv4(),
    username,
    passwordHash,
    role: validRoles.includes(role) ? role : 'uporabnik',
  };
  users.push(newUser);
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  } catch (err) {
    return res.status(500).json({ message: 'Error saving user data.' });
  }
  res.status(201).json({ message: 'User registered successfully.' });
});

export default router;

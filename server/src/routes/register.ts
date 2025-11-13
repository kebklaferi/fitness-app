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

  const dataDir = path.join(__dirname, '../data');
  const filePath = path.join(dataDir, 'users.json');

  // Ensure data folder exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  let users: User[] = [];

  // Read existing users
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      users = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading user data:', err);
    return res.status(500).json({ message: 'Error reading user data.', error: err });
  }

  // Check if username already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists.' });
  }

  // Hash password
  let passwordHash: string;
  try {
    passwordHash = await bcrypt.hash(password, 10);
  } catch (err) {
    console.error('Error hashing password:', err);
    return res.status(500).json({ message: 'Error processing password.', error: err });
  }

  const validRoles = ['uporabnik', 'trener', 'admin'];
  const newUser: User = {
    id: uuidv4(),
    username,
    passwordHash,
    role: validRoles.includes(role) ? role : 'uporabnik',
  };

  users.push(newUser);

  // Write updated users to file
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing user data:', err);
    return res.status(500).json({ message: 'Error saving user data.', error: err });
  }

  res.status(201).json({ message: 'User registered successfully.' });
});

export default router;

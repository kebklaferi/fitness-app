import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/Users';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { username, email, phoneNumber, name_surname, password, role } = req.body;

    if (!username || !password || !email || !phoneNumber || !name_surname) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user/email/phone already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Username, email, or phone number already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const validRoles = ['uporabnik', 'trener', 'admin'];
    const newUser: IUser = new User({
      username,
      email,
      phoneNumber,
      name_surname,
      passwordHash,
      role: validRoles.includes(role) ? role : 'uporabnik',
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user.', error: err });
  }
});

export default router;

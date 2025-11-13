import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { User } from "../interfaces/user";

const router = Router();

router.post("/", async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET not defined in server environment" });
  }

  const { username, password } = req.body;
  const filePath = path.join(__dirname, "../data/users.json");
  let users: User[] = [];

  try {
    if (fs.existsSync(filePath)) {
      users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error reading user data." });
  }

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: "Invalid credentials." });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Invalid credentials." });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET!,
    { expiresIn: "1h" }
  );

  // Return success message along with the token
  res.status(200).json({
    message: "Login successful ✅",
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
});

export default router;

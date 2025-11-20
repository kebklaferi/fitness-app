import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any; // attach decoded JWT payload
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Token missing" });

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) return res.status(500).json({ message: "JWT_SECRET not defined" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // store payload for route
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

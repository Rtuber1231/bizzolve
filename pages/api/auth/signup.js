// FILE: /pages/api/auth/signup.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingEmail = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        username,
        password: hashedPassword,
        role: 'STUDENT',
      },
    });

    res.status(201).json({ 
        message: 'User created successfully',
        user: { 
            id: newUser.id, 
            name: newUser.name, 
            email: newUser.email,
            username: newUser.username,
            role: newUser.role
        }
    });

  } catch (error) {
    console.error('Signup API Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}

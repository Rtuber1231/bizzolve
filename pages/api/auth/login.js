// FILE: /pages/api/auth/login.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Exclude password from the returned object
    const { password: _, ...userToReturn } = user;

    res.status(200).json({
      message: 'Login successful!',
      user: userToReturn // Return the full user object
    });

  } catch (error) {
    console.error('Login API Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}

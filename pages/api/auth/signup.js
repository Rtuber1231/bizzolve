// FILE: /pages/api/auth/signup.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, username, password, role } = req.body;

    if (!name || !email || !username || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ... (validation checks remain the same)

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        username,
        password: hashedPassword,
        role: role,
      },
    });
    
    // Exclude password from the returned object
    const { password: _, ...userToReturn } = newUser;

    res.status(201).json({ 
        message: 'Account created successfully!',
        user: userToReturn // Return the full user object
    });

  } catch (error) {
    console.error('Signup API Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}

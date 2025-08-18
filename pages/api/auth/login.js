// FILE: /pages/api/auth/login.js
// DESC: Handles user login and authentication.

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;

    // 1. Input Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // 3. If user doesn't exist or password doesn't match, send error
    // We use a generic message to avoid revealing whether an email is registered.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Respond with success (in a real app, you'd create a session/token here)
    // IMPORTANT: Do not send the password back to the client.
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Login API Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again.' });
  }
}

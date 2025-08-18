// Import necessary libraries
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // For hashing passwords securely

// Initialize Prisma Client
const prisma = new PrismaClient();

// The main function that handles incoming requests
export default async function handler(req, res) {
  // We only want to allow POST requests to this endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Extract user details from the request body
    const { name, email, password } = req.body;

    // --- 1. Input Validation ---
    // Ensure all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // --- 2. Check for Existing User ---
    // Use Prisma to find if a user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }, // Case-insensitive check
    });

    if (existingUser) {
      // If user exists, return a conflict error
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // --- 3. Securely Hash the Password ---
    // Never store plain-text passwords. Always hash them.
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // --- 4. Create the New User in the Database ---
    // Use Prisma to create a new record in the User table
    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        // The 'role' will default to STUDENT as defined in the schema
      },
    });

    // --- 5. Respond with Success ---
    // Send a success status code and the new user's basic info.
    // IMPORTANT: Never send the password back to the client, not even the hashed one.
    res.status(201).json({ 
        message: 'User created successfully',
        user: { 
            id: newUser.id, 
            name: newUser.name, 
            email: newUser.email,
            role: newUser.role
        }
    });

  } catch (error) {
    // If any error occurs, log it on the server and send a generic error message
    console.error('Signup API Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again.' });
  }
}

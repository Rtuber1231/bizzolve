// FILE: /pages/api/test-db.js
// DESC: A simple endpoint to test the database connection.

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  
  try {
    console.log("Attempting to connect to the database...");
    await prisma.$connect();
    console.log("Database connection successful!");
    res.status(200).json({ message: 'Success: Database connection is working.' });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ 
        message: 'Error: Failed to connect to the database.',
        error: error.message 
    });
  } finally {
    await prisma.$disconnect();
    console.log("Database connection closed.");
  }
}

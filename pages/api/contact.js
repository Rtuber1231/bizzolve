// FILE: /pages/api/contact.js
// DESC: Handles submissions from the contact form.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    // Save the query to the database
    const newQuery = await prisma.query.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    // In a real application, you might also send an email notification here.

    res.status(201).json({ message: 'Your query has been sent successfully!', query: newQuery });

  } catch (error) {
    console.error('Contact Form API Error:', error);

    // Provide a more specific error message if it's a known database issue
    if (error.code) { // Prisma errors often have a code property
        res.status(500).json({ message: 'Database error: Could not save your query.' });
    } else {
        res.status(500).json({ message: 'An unexpected server error occurred. Please try again.' });
    }
  }
}

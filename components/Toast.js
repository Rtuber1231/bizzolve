// FILE: /pages/api/challenges/create.js
import { PrismaClient } from '@prisma/client';
// In a real app, you would get the user session to verify they are an enterprise user
// import { getSession } from 'next-auth/react'; 

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // const session = await getSession({ req });
  // if (!session || session.user.role !== 'ENTERPRISE') {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { title, description, points, tags } = req.body;

    if (!title || !description || !points || !tags) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newChallenge = await prisma.challenge.create({
      data: {
        title,
        description,
        points: parseInt(points, 10),
        tags: tags.split(',').map(tag => tag.trim()),
        // authorId: session.user.id, // In a real app, you'd link to the logged-in user
        authorId: "clx_mock_enterprise_id" // Placeholder for now
      },
    });

    res.status(201).json({ message: 'Challenge created successfully', challenge: newChallenge });

  } catch (error) {
    console.error('Create Challenge API Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}

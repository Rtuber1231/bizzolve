// FILE: /pages/api/profile/update.js
// DESC: Updated to use the efficient, cached Prisma Client.

import { prisma } from '../../../lib/prisma'; // Import the new client
// In a real app, you would get the user's session to authorize this action
// import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  // const session = await getSession({ req });
  // if (!session) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const profileData = req.body;
    // In a real app, you'd get the user ID from the session
    // const userId = session.user.id; 
    const userId = "clx_mock_user_id"; // Using a placeholder for now

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: profileData.name,
        school: profileData.school,
        bio: profileData.bio,
        avatarUrl: profileData.avatarUrl,
        linkedinUrl: profileData.linkedinUrl,
        githubUrl: profileData.githubUrl,
      },
    });

    // Don't send the password back
    const { password, ...userWithoutPassword } = updatedUser;

    res.status(200).json({ message: 'Profile updated successfully', user: userWithoutPassword });

  } catch (error) {
    console.error('Update Profile API Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}

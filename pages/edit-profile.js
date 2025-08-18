// FILE: /pages/edit-profile.js
// DESC: A new page for the authorized user to edit their profile details.

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Mock data for the currently logged-in user
const currentUserProfile = {
    name: "Saanvi Iyer",
    school: "NMIMS Mumbai",
    bio: "Aspiring strategy consultant with a passion for solving complex market-entry problems and a keen interest in the D2C space. Proven ability to translate data into actionable insights.",
    avatarUrl: "https://i.pravatar.cc/150?u=1",
    linkedinUrl: "https://linkedin.com/in/saanvi-iyer",
    githubUrl: "https://github.com/saanvi-iyer",
};

export default function EditProfilePage() {
  return (
    <>
      <Head>
        <title>Edit Profile - BizSolve</title>
      </Head>
      <div className="container mx-auto px-6 py-12 flex justify-center fade-in">
        <div className="w-full max-w-2xl">
          <div className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-center mb-2">Edit Your Profile</h2>
            <p className="text-brand-secondary dark:text-gray-400 text-center mb-8">
              Keep your portfolio up-to-date to attract the best opportunities.
            </p>
            
            <form className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <img src={currentUserProfile.avatarUrl} alt={currentUserProfile.name} className="w-20 h-20 rounded-full" />
                <div>
                    <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Avatar URL</label>
                    <input type="text" name="avatarUrl" id="avatarUrl" defaultValue={currentUserProfile.avatarUrl} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" name="name" id="name" defaultValue={currentUserProfile.name} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
              </div>

              {/* School */}
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300">School / University</label>
                <input type="text" name="school" id="school" defaultValue={currentUserProfile.school} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                <textarea name="bio" id="bio" rows="4" defaultValue={currentUserProfile.bio} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"></textarea>
              </div>

              {/* Social Links */}
              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile URL</label>
                <input type="url" name="linkedinUrl" id="linkedinUrl" defaultValue={currentUserProfile.linkedinUrl} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
              </div>
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub Profile URL</label>
                <input type="url" name="githubUrl" id="githubUrl" defaultValue={currentUserProfile.githubUrl} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <Link href="/profile" className="bg-white dark:bg-gray-700 text-brand-text dark:text-white font-semibold py-2 px-6 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    Cancel
                </Link>
                <button type="submit" className="bg-brand-signature text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

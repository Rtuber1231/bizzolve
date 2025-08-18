// FILE: /pages/edit-profile.js
// DESC: An updated page for the user to edit their profile, including avatar management.

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Toast from '../components/Toast'; // Assuming you have a Toast component

// In a real app, this data would be fetched from the database
const initialProfileData = {
    name: "Saanvi Iyer",
    school: "NMIMS Mumbai",
    bio: "Aspiring strategy consultant with a passion for solving complex market-entry problems and a keen interest in the D2C space. Proven ability to translate data into actionable insights.",
    avatarUrl: "https://i.pravatar.cc/150?u=1",
    linkedinUrl: "https://linkedin.com/in/saanvi-iyer",
    githubUrl: "https://github.com/saanvi-iyer",
};

export default function EditProfilePage() {
  const [formData, setFormData] = useState(initialProfileData);
  const [toast, setToast] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(initialProfileData.avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
      setAvatarFile(null);
      setAvatarPreview(null); // Or a default placeholder image URL
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app, you would first upload the avatarFile to cloud storage (e.g., S3),
    // get the URL back, and then save that URL with the rest of the form data.
    
    try {
      // This is a placeholder for the full logic
      const dataToSave = { ...formData, avatarUrl: avatarPreview };

      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ message: 'Profile updated successfully!', type: 'success' });
      } else {
        setToast({ message: data.message || 'Failed to update profile.', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  return (
    <>
      <Head>
        <title>Edit Profile - BizSolve</title>
      </Head>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      <div className="container mx-auto px-6 py-12 flex justify-center fade-in">
        <div className="w-full max-w-2xl">
          <div className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-center mb-2">Edit Your Profile</h2>
            <p className="text-brand-secondary dark:text-gray-400 text-center mb-8">
              Keep your portfolio up-to-date to attract the best opportunities.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <img src={avatarPreview || `https://placehold.co/96x96/E2E8F0/4A5568?text=Avatar`} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover" />
                <div className="flex items-center gap-2">
                    <label htmlFor="avatar-upload" className="cursor-pointer bg-white dark:bg-gray-700 text-brand-text dark:text-white font-semibold py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        Change
                    </label>
                    <input type="file" id="avatar-upload" accept="image/png, image/jpeg" onChange={handleAvatarChange} className="hidden" />
                    <button type="button" onClick={handleRemoveAvatar} className="text-sm text-brand-secondary dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                        Remove
                    </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
              </div>

              {/* School */}
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300">School / University</label>
                <input type="text" name="school" id="school" value={formData.school} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                <textarea name="bio" id="bio" rows="4" value={formData.bio} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"></textarea>
              </div>

              {/* Social Links */}
              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile URL</label>
                <input type="url" name="linkedinUrl" id="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
              </div>
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub Profile URL</label>
                <input type="url" name="githubUrl" id="githubUrl" value={formData.githubUrl} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
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

// FILE: /pages/profile.js
// DESC: The public profile page, now with default letter avatars.

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Mock data for a specific student's profile and submissions
const solverProfile = {
    name: "Saanvi Iyer",
    username: "@saanvi_iyer",
    avatarUrl: "", // Empty to show the default avatar
    // ... rest of the profile data
};

const DefaultAvatar = ({ name, size = "large" }) => {
    const sizeClasses = size === "large" ? "w-32 h-32 text-5xl" : "w-10 h-10 text-xl";
    return (
        <div className={`rounded-full bg-blue-500 flex items-center justify-center font-bold text-white ${sizeClasses}`}>
            {name ? name.charAt(0).toUpperCase() : '?'}
        </div>
    );
};

export default function ProfilePage() {
  const isOwner = true; 

  return (
    <>
      <Head>
        <title>{solverProfile.name}'s Profile - BizSolve</title>
      </Head>
      <div className="container mx-auto px-6 py-12 fade-in">
        <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <aside className="lg:col-span-4">
                <div className="sticky top-28">
                    <div className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
                        <div className="flex justify-center mb-4">
                            {solverProfile.avatarUrl ? 
                                <img src={solverProfile.avatarUrl} alt={solverProfile.name} className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-md" /> :
                                <DefaultAvatar name={solverProfile.name} />
                            }
                        </div>
                        <h1 className="text-3xl font-bold">{solverProfile.name}</h1>
                        {/* ... rest of the profile sidebar ... */}
                    </div>
                    {/* ... rest of the sidebar ... */}
                </div>
            </aside>
            {/* ... rest of the profile page ... */}
        </div>
      </div>
    </>
  );
}

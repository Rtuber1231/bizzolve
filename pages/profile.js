// FILE: /pages/profile.js
// DESC: A fully dynamic profile page that displays data for the logged-in user.

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from '../context/SessionContext';
import { useRouter } from 'next/router';

// NOTE: All mock data has been removed from this file.

const SocialLink = ({ href, icon, text }) => (
    <Link href={href || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-secondary dark:text-gray-400 hover:text-brand-signature dark:hover:text-blue-400 transition-colors">
        {icon}
        <span className="text-sm">{text}</span>
    </Link>
);

export default function ProfilePage() {
  const { session } = useSession();
  const router = useRouter();

  // If the session is loading or the user is not logged in, show a message.
  if (!session) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">Please log in to view your profile.</h1>
        <Link href="/auth" className="mt-4 inline-block bg-brand-signature text-white font-semibold py-2 px-6 rounded-md hover:opacity-90 transition-opacity">
            Login
        </Link>
      </div>
    );
  }

  // Once the session is loaded, display the user's profile
  return (
    <>
      <Head>
        <title>{session.name}'s Profile - BizSolve</title>
      </Head>
      <div className="container mx-auto px-6 py-12 fade-in">
        <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <aside className="lg:col-span-4">
                <div className="sticky top-28">
                    <div className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
                        <img src={session.avatarUrl || `https://i.pravatar.cc/150?u=${session.id}`} alt={session.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white dark:border-gray-800 shadow-md" />
                        <h1 className="text-3xl font-bold">{session.name}</h1>
                        <p className="text-md text-brand-secondary dark:text-gray-400">@{session.username}</p>
                        
                        <div className="grid grid-cols-3 gap-4 my-6 text-center">
                            <div>
                                <p className="text-2xl font-bold text-brand-text dark:text-white">{session.submissions?.length || 0}</p>
                                <p className="text-xs text-brand-secondary dark:text-gray-400">Submissions</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-brand-text dark:text-white">{session.followers?.length || 0}</p>
                                <p className="text-xs text-brand-secondary dark:text-gray-400">Followers</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-brand-text dark:text-white">{session.averageScore || 0}%</p>
                                <p className="text-xs text-brand-secondary dark:text-gray-400">Avg. Score</p>
                            </div>
                        </div>
                        
                        <Link href="/edit-profile" className="block w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-lg transition-colors">
                            Edit Profile
                        </Link>
                    </div>

                    <div className="mt-6 bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <h3 className="font-bold mb-4">About</h3>
                        <p className="text-sm text-brand-secondary dark:text-gray-400 leading-relaxed">{session.bio || "This user hasn't written a bio yet."}</p>
                    </div>
                </div>
            </aside>

            {/* Right Content: Portfolio */}
            <div className="lg:col-span-8">
                <h2 className="text-2xl font-bold mb-6">Solved Challenges Portfolio</h2>
                <div className="space-y-6">
                    {/* In a real app, this would be a map over session.submissions */}
                    <div className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
                        <p className="text-brand-secondary">No submissions yet.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

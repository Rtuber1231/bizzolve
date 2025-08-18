// FILE: /pages/profile.js
// DESC: The public profile and portfolio page for a solver with platform-specific stats.

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Mock data for a specific student's profile and submissions
const solverProfile = {
    name: "Saanvi Iyer",
    username: "@saanvi_iyer",
    school: "NMIMS Mumbai",
    totalSubmissions: 12,
    followers: 142,
    averageScore: 88,
    bio: "Aspiring strategy consultant with a passion for solving complex market-entry problems and a keen interest in the D2C space. Proven ability to translate data into actionable insights.",
    avatarUrl: "https://i.pravatar.cc/150?u=1",
    linkedinUrl: "#", // Placeholder
    githubUrl: "#",   // Placeholder
};

const mockSubmissions = [
    { 
        id: 1,
        problem: "Market Entry Strategy for a D2C Health Brand", 
        insight: "Identified a niche wellness market in Tier-2 cities, proposing a hyper-local digital campaign.",
        points: 1500,
        domain: "Strategy"
    },
    { 
        id: 2,
        problem: "Develop a Viral Marketing Campaign for a Mobile App", 
        insight: "Conceptualized a user-generated content challenge on TikTok leveraging trending audio.",
        points: 500,
        domain: "Marketing"
    },
];

const SocialLink = ({ href, icon, text }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-secondary dark:text-gray-400 hover:text-brand-signature dark:hover:text-blue-400 transition-colors">
        {icon}
        <span className="text-sm">{text}</span>
    </Link>
);

export default function ProfilePage() {
  // This would be a real check in a full app, e.g., session.user.id === solverProfile.id
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
                        <img src={solverProfile.avatarUrl} alt={solverProfile.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white dark:border-gray-800 shadow-md" />
                        <h1 className="text-3xl font-bold">{solverProfile.name}</h1>
                        <p className="text-md text-brand-secondary dark:text-gray-400">{solverProfile.username}</p>
                        
                        <div className="grid grid-cols-3 gap-4 my-6 text-center">
                            <div>
                                <p className="text-2xl font-bold text-brand-text dark:text-white">{solverProfile.totalSubmissions}</p>
                                <p className="text-xs text-brand-secondary dark:text-gray-400">Submissions</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-brand-text dark:text-white">{solverProfile.followers}</p>
                                <p className="text-xs text-brand-secondary dark:text-gray-400">Followers</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-brand-text dark:text-white">{solverProfile.averageScore}%</p>
                                <p className="text-xs text-brand-secondary dark:text-gray-400">Avg. Score</p>
                            </div>
                        </div>
                        
                        {isOwner && (
                            <Link href="/edit-profile" className="block w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-lg transition-colors">
                                Edit Profile
                            </Link>
                        )}
                    </div>

                    <div className="mt-6 bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <h3 className="font-bold mb-4">About</h3>
                        <p className="text-sm text-brand-secondary dark:text-gray-400 leading-relaxed">{solverProfile.bio}</p>
                    </div>
                </div>
            </aside>

            {/* Right Content: Portfolio */}
            <div className="lg:col-span-8">
                <div className="space-y-6">
                    {mockSubmissions.map(sub => (
                        <div key={sub.id} className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">{sub.domain}</p>
                                    <h3 className="text-xl font-bold mt-1">{sub.problem}</h3>
                                </div>
                                <p className="font-bold text-blue-600 dark:text-blue-400 text-lg whitespace-nowrap ml-4">+{sub.points} XP</p>
                            </div>
                            <p className="text-brand-secondary dark:text-gray-400 mt-3 italic">
                                Key Insight: "{sub.insight}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

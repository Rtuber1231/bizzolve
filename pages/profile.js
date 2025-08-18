// FILE: /pages/profile.js
// DESC: The public profile and portfolio page for a solver.

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Mock data for a specific student's profile and submissions
const solverProfile = {
    name: "Saanvi Iyer",
    school: "NMIMS Mumbai",
    rank: 1,
    totalPoints: 2850,
    solvedChallenges: 5,
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
    { 
        id: 3,
        problem: "HR Policy Redesign for a Hybrid Workforce", 
        insight: "Designed a flexible 'work-from-anywhere' policy with quarterly in-person collaboration sprints.",
        points: 850,
        domain: "Human Resources"
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
                        <p className="text-md text-brand-secondary dark:text-gray-400 mt-1">{solverProfile.school}</p>
                        
                        {isOwner && (
                            <button className="w-full mt-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-lg transition-colors">
                                Edit Profile
                            </button>
                        )}
                    </div>
                    
                    <div className="mt-6 bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <h3 className="font-bold mb-4">About</h3>
                        <p className="text-sm text-brand-secondary dark:text-gray-400 leading-relaxed">{solverProfile.bio}</p>
                    </div>

                    <div className="mt-6 bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <h3 className="font-bold mb-4">Links</h3>
                        <div className="space-y-3">
                            <SocialLink href={solverProfile.linkedinUrl} text="LinkedIn Profile" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>} />
                            <SocialLink href={solverProfile.githubUrl} text="GitHub Profile" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>} />
                        </div>
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

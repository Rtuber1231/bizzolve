// FILE: /pages/profile.js
// DESC: The public profile and portfolio page for a solver.

import React from 'react';
import Head from 'next/head';

// Mock data for a specific student's profile and submissions
const solverProfile = {
    name: "Saanvi Iyer",
    school: "NMIMS Mumbai",
    rank: 1,
    totalPoints: 2850,
    solvedChallenges: 5,
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


export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>{solverProfile.name}'s Profile - BizSolve</title>
      </Head>
      <div className="container mx-auto px-6 py-12 fade-in">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mb-6 md:mb-0 md:mr-8 flex-shrink-0"></div>
            <div>
                <h1 className="text-4xl font-bold">{solverProfile.name}</h1>
                <p className="text-lg text-brand-secondary dark:text-gray-400 mt-1">{solverProfile.school}</p>
                <div className="flex justify-center md:justify-start items-center gap-6 mt-4 text-brand-secondary dark:text-gray-400">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-brand-text dark:text-white">#{solverProfile.rank}</p>
                        <p className="text-sm">Global Rank</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-brand-text dark:text-white">{solverProfile.totalPoints.toLocaleString()}</p>
                        <p className="text-sm">Total XP</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-brand-text dark:text-white">{solverProfile.solvedChallenges}</p>
                        <p className="text-sm">Solved</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Submissions Portfolio */}
        <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Solved Challenges Portfolio</h2>
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
    </>
  );
}

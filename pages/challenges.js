// FILE: /pages/challenges.js
// DESC: The main dashboard for solvers to find challenges.

import React from 'react';
import Head from 'next/head';

const mockChallenges = [
    { id: 1, title: "Market Entry Strategy for a D2C Health Brand", company: "Vitality+", tags: ["Strategy", "Growth"], difficulty: "Intermediate", reward: 1500, submissions: 78, timeLeft: "8 days" },
    { id: 2, title: "Optimizing Supply Chain for a Fashion Retailer", company: "Chic Threads", tags: ["Operations", "Logistics"], difficulty: "Expert", reward: 2500, submissions: 23, timeLeft: "21 days" },
    { id: 3, title: "Viral Marketing Campaign for a Mobile App", company: "AppLaunch", tags: ["Marketing", "Social Media"], difficulty: "Beginner", reward: 500, submissions: 150, timeLeft: "5 days" },
];

export default function ChallengesPage() {
  return (
    <>
      <Head>
        <title>Challenges - BizSolve</title>
      </Head>
      <div className="container mx-auto px-6 py-12 fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold">Challenges</h1>
                <p className="text-brand-secondary dark:text-gray-400 mt-1">Find your next opportunity to showcase your skills.</p>
            </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockChallenges.map(c => (
                <div key={c.id} className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col">
                    <div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${c.difficulty === 'Expert' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : c.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}`}>{c.difficulty}</span>
                        <h3 className="text-xl font-bold my-3">{c.title}</h3>
                        <p className="text-brand-secondary dark:text-gray-400 text-sm mb-4">Posted by {c.company}</p>
                    </div>
                    <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm text-brand-secondary dark:text-gray-400">
                        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold">
                            <span>+{c.reward.toLocaleString()} XP</span>
                        </div>
                        <div className="text-right">
                            <p>{c.timeLeft} left</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
}

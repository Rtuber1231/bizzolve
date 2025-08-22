// FILE: /pages/challenges/[id].js
// DESC: A dynamic page to show the full details of a specific challenge.

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// In a real app, you would fetch this data from your database using the [id] from the URL
// For now, we'll use mock data.
const mockChallenges = [
    { id: 1, title: "Market Entry Strategy for a D2C Health Brand", company: "Vitality+", description: "Vitality+ is a leading D2C brand in North America specializing in vegan supplements. We are looking to expand into the European market but need a data-driven strategy to identify the most promising entry points. Your task is to conduct a thorough market analysis and propose a comprehensive go-to-market plan.", scenario: "You are a strategy consultant hired by Vitality+. Your final report will be presented to the board of directors. They are looking for actionable insights, clear justifications for your recommendations, and a realistic financial projection for the first year of operations.", points: 1500, tags: ["Strategy", "Growth", "Market Research"]},
    { id: 2, title: "Optimizing Supply Chain for a Fashion Retailer", company: "Chic Threads", description: "...", scenario: "...", points: 2500, tags: ["Operations", "Logistics"]},
    { id: 3, title: "Viral Marketing Campaign for a Mobile App", company: "AppLaunch", description: "...", scenario: "...", points: 500, tags: ["Marketing", "Social Media"]},
];


export default function ChallengeDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Get the ID from the URL

  // Find the challenge data based on the ID.
  const challenge = mockChallenges.find(c => c.id === parseInt(id));

  // If the challenge is not found (e.g., invalid ID), show a message.
  if (!challenge) {
    return (
        <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="text-2xl font-bold">Challenge not found.</h1>
            <Link href="/challenges" className="mt-4 inline-block text-brand-signature hover:underline">
                &larr; Back to all challenges
            </Link>
        </div>
    );
  }

  return (
    <>
      <Head>
        <title>{challenge.title} - BizSolve</title>
      </Head>
      <div className="container mx-auto px-6 py-12 fade-in">
        <div className="max-w-4xl mx-auto">
            <Link href="/challenges" className="text-sm text-brand-secondary dark:text-gray-400 hover:text-brand-text dark:hover:text-white transition-colors mb-6 inline-block">
                &larr; Back to all challenges
            </Link>
            <div className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {challenge.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium px-2.5 py-1 rounded-full">{tag}</span>)}
                        </div>
                        <h1 className="text-4xl font-bold">{challenge.title}</h1>
                        <p className="text-lg text-brand-secondary dark:text-gray-400 mt-1">Posted by {challenge.company}</p>
                    </div>
                    <p className="font-bold text-blue-600 dark:text-blue-400 text-2xl whitespace-nowrap ml-4">+{challenge.points} XP</p>
                </div>

                <div className="border-t dark:border-gray-700 my-8"></div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">The Brief</h2>
                    <p className="text-brand-secondary dark:text-gray-400 leading-relaxed">{challenge.description}</p>
                </div>
                
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">The Scenario</h2>
                    <p className="text-brand-secondary dark:text-gray-400 leading-relaxed">{challenge.scenario}</p>
                </div>

                <div className="mt-10">
                    <button className="w-full bg-brand-signature text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity">
                        Start Solving
                    </button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

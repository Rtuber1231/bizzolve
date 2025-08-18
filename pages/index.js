// FILE: /pages/index.js
// DESC: This is the updated landing page with the new tagline and case study section.

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const mockCaseStudies = [
    { 
        problem: "Market Entry Strategy for a D2C Brand", 
        solver: "Saanvi Iyer", 
        school: "NMIMS Mumbai",
        insight: "Identified a niche wellness market in Tier-2 cities, proposing a hyper-local digital campaign that led to a 150% increase in projected engagement.",
        feedback: "A brilliant, data-driven approach. Saanvi's insights were immediately actionable.",
        company: "Vitality+"
    },
    { 
        problem: "Supply Chain Optimization for a Fashion Retailer", 
        solver: "Kabir Mehta", 
        school: "IIFT Delhi",
        insight: "Proposed a predictive AI model for inventory management to reduce waste by 22% and improve delivery times.",
        feedback: "Kabir's solution was innovative and addressed our core operational challenges.",
        company: "Chic Threads"
    },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>BizSolve - Match Problems to Their Solvers</title>
      </Head>
      <div className="fade-in">
        {/* Hero Section */}
        <div className="container mx-auto px-6 text-center py-20 lg:py-32">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
                    Match Problems to Their Solvers.
                </span>
            </h1>
            <p className="text-lg text-brand-secondary dark:text-gray-400 max-w-3xl mx-auto mb-10">
                The platform where enterprises find brilliant solutions and students build a portfolio of real-world success. Reviewed, scored, and recognized.
            </p>
            <div className="flex justify-center items-center gap-4">
                <Link href="/challenges" className="bg-brand-primary dark:bg-white dark:text-brand-primary text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity">
                    Browse Challenges
                </Link>
                <Link href="/enterprise" className="bg-white dark:bg-gray-800 text-brand-text dark:text-white font-semibold py-3 px-8 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Post a Problem
                </Link>
            </div>
        </div>

        {/* Case Studies Section */}
        <div className="py-20 bg-gray-50 dark:bg-gray-900/50 border-y dark:border-gray-800">
            <div className="container mx-auto px-6">
                 <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
                    <p className="text-brand-secondary dark:text-gray-400">See how students are making a real impact by solving challenges for innovative companies.</p>
                </div>
                <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {mockCaseStudies.map(study => (
                        <div key={study.problem} className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-3">{study.problem}</h3>
                            <p className="text-brand-secondary dark:text-gray-400 mb-4 text-sm">Solved by <span className="font-semibold text-brand-text dark:text-gray-200">{study.solver}</span> ({study.school})</p>
                            <blockquote className="border-l-4 border-blue-500 pl-4 my-6">
                                <p className="italic text-gray-800 dark:text-gray-300">"{study.insight}"</p>
                            </blockquote>
                            <p className="font-semibold text-sm">Liked by <span className="text-blue-600 dark:text-blue-400">{study.company}</span></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

// FILE: /pages/index.js
// DESC: This is the landing page of the application.

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const mockTopSolvers = [
    { name: "Saanvi Iyer", school: "NMIMS Mumbai", score: 81 },
    { name: "Kabir Mehta", school: "IIFT Delhi", score: 81 },
    { name: "Aarav Sharma", school: "IIM Indore", score: 77 },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>BizSolve - Solve Real Business Problems</title>
      </Head>
      <div className="fade-in">
        {/* Hero Section */}
        <div className="container mx-auto px-6 text-center py-20 lg:py-32">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
                    Solve Real Business Problems.
                </span>
                <br className="hidden md:block" />
                Get Noticed. Get Hired.
            </h1>
            <p className="text-lg text-brand-secondary dark:text-gray-400 max-w-3xl mx-auto mb-10">
                An always-on platform where enterprises post real challenges and students submit solutions. Reviewed, scored, ranked. With an AI coach at your side.
            </p>
            <div className="flex justify-center items-center gap-4">
                <Link href="/challenges" className="bg-brand-primary dark:bg-white dark:text-brand-primary text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity">
                    Browse Challenges
                </Link>
                <Link href="/enterprise" className="bg-white dark:bg-gray-800 text-brand-text dark:text-white font-semibold py-3 px-8 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Enter Enterprise
                </Link>
            </div>
        </div>

        {/* Top Solvers Section */}
        <div className="py-16 bg-gray-50 dark:bg-gray-900/50 border-y dark:border-gray-800">
            <div className="container mx-auto px-6">
                 <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Meet Our Top Solvers</h2>
                    <p className="text-brand-secondary dark:text-gray-400">The brightest minds solving real-world challenges and getting recognized by top companies.</p>
                </div>
                <div className="mt-12 max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm backdrop-blur-sm">
                        <h3 className="text-xl font-bold mb-6">Top Solvers (This Week)</h3>
                        <ul className="space-y-5">
                            {mockTopSolvers.map(solver => (
                                <li key={solver.name} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                        <div>
                                            <p className="font-semibold">{solver.name}</p>
                                            <p className="text-sm text-brand-secondary dark:text-gray-400">{solver.school}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">{solver.score}</p>
                                        <p className="text-sm text-brand-secondary dark:text-gray-400">Avg</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

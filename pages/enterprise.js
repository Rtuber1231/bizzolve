// FILE: /pages/enterprise.js
// DESC: The dashboard for enterprise users.

import React from 'react';
import Head from 'next/head';

const mockEnterpriseChallenges = [
    { name: "Market Entry Strategy", status: "Active", submissions: 78 },
    { name: "Customer Retention Strategy", status: "Reviewing", submissions: 45 },
    { name: "Viral Marketing Campaign", status: "Completed", submissions: 150 },
];

export default function EnterprisePage() {
  return (
    <>
      <Head>
        <title>Enterprise Dashboard - BizSolve</title>
      </Head>
      <div className="container mx-auto px-6 py-12 fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold">Enterprise Dashboard</h1>
                <p className="text-brand-secondary dark:text-gray-400 mt-1">Manage your challenges and discover top talent.</p>
            </div>
            <button className="bg-brand-signature text-white font-semibold py-2 px-6 rounded-md hover:opacity-90 transition-opacity mt-4 md:mt-0 flex items-center gap-2">
                <span>Post a New Challenge</span>
            </button>
        </div>
        <div className="bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm backdrop-blur-sm">
            <div className="p-6"><h3 className="text-xl font-bold">Your Active Challenges</h3></div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    {/* Table content will go here */}
                </table>
            </div>
        </div>
      </div>
    </>
  );
}

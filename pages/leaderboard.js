// FILE: /pages/leaderboard.js
// DESC: A placeholder for the main leaderboard page.

import React from 'react';
import Head from 'next/head';

export default function LeaderboardPage() {
  return (
    <>
      <Head>
        <title>Leaderboard - BizSolve</title>
      </Head>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
        <p className="text-brand-secondary mt-1">This page will display the full leaderboard of all solvers.</p>
      </div>
    </>
  );
}

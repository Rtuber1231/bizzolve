// FILE: /pages/my-challenges.js
// DESC: A placeholder for the user's personal challenges page.

import React from 'react';
import Head from 'next/head';

export default function MyChallengesPage() {
  return (
    <>
      <Head>
        <title>My Challenges - BizSolve</title>
      </Head>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold">My Challenges</h1>
        <p className="text-brand-secondary mt-1">This page will display the challenges the logged-in user has participated in.</p>
      </div>
    </>
  );
}

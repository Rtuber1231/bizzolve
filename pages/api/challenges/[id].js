// FILE: /pages/challenges/[id].js
import React from 'react';
import Head from 'next/head';
// In a real app, you would fetch this data from your database
// export async function getServerSideProps(context) { ... }

const mockChallengeDetail = {
    id: 1,
    title: "Market Entry Strategy for a D2C Health Brand",
    company: "Vitality+",
    description: "A full, detailed description of the challenge goes here. It would explain the context, the core problem, the data provided, and the expected deliverables from the solver.",
    points: 1500,
    tags: ["Strategy", "Growth"],
};

export default function ChallengeDetailPage() {
  const challenge = mockChallengeDetail;
  return (
    <>
      <Head><title>{challenge.title}</title></Head>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold">{challenge.title}</h1>
        <p className="text-lg text-brand-secondary">Posted by {challenge.company}</p>
        {/* ... Rest of the detail page layout ... */}
      </div>
    </>
  );
}

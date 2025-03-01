"use client";
import { useState } from 'react';
import Head from 'next/head';
import Simulation from '../../components/normalization/Simulation';

export default function Normalization() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Database Normalization Simulation</title>
        <meta name="description" content="Learn database normalization through interactive simulation" />
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          University Management System - Normalization Simulation
        </h1>
        <Simulation />
      </main>
      
      <footer className="mt-12 py-6 bg-gray-100 text-center text-gray-600 text-sm">
        <p>Developed for Database Design Education</p>
      </footer>
    </div>
  );
}
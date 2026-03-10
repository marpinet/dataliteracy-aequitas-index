'use client';

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [contactType, setContactType] = useState<string>("demo");

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
            ← Back to home
          </Link>
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Talk to us.</h1>
        
        <div className="space-y-8">
          {/* Contact options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <button
              onClick={() => setContactType("demo")}
              className={`p-4 rounded-lg border-2 transition ${
                contactType === "demo"
                  ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                  : "border-gray-200 dark:border-gray-800 text-black dark:text-white hover:border-black dark:hover:border-white"
              }`}
            >
              Request Demo
            </button>
            <button
              onClick={() => setContactType("government")}
              className={`p-4 rounded-lg border-2 transition ${
                contactType === "government"
                  ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                  : "border-gray-200 dark:border-gray-800 text-black dark:text-white hover:border-black dark:hover:border-white"
              }`}
            >
              Government Inquiry
            </button>
            <button
              onClick={() => setContactType("api")}
              className={`p-4 rounded-lg border-2 transition ${
                contactType === "api"
                  ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                  : "border-gray-200 dark:border-gray-800 text-black dark:text-white hover:border-black dark:hover:border-white"
              }`}
            >
              API Access
            </button>
          </div>
          
          {/* Contact form */}
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-black dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-black dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-black dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

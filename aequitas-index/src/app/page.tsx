'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [countryCount, setCountryCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { count, error } = await supabase
          .from('gii_data')
          .select('*', { count: 'exact', head: true });
        
        if (!error && count !== null) {
          setCountryCount(count);
        }
      } catch (e) {
        console.error('Error fetching data:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">Aequitas Index</div>
          <nav className="flex items-center gap-8">
            <Link href="/product" className="text-sm hover:text-gray-600">Product</Link>
            <Link href="/methodology" className="text-sm hover:text-gray-600">Methodology</Link>
            <Link href="/pricing" className="text-sm hover:text-gray-600">Pricing</Link>
            <Link href="/about" className="text-sm hover:text-gray-600">About</Link>
            <Link href="/contact" className="text-sm hover:text-gray-600">Contact</Link>
            <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90">
              Start Free →
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
          The Global Innovation Index is the global standard.
          <br />
          <span className="text-gray-600 dark:text-gray-400">It is also systematically wrong.</span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Aequitas Index reprocesses GII data through a proprietary adjustment model — correcting for patent bias, ICT overweighting, and income-group distortion — to surface the innovation overperformers that raw scores actively obscure.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <Link href="/dashboard" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 font-medium">
            Explore Data →
          </Link>
          <Link href="/contact" className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 font-medium">
            Request Demo
          </Link>
        </div>

        {!loading && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Analyzing data for {countryCount} economies
          </p>
        )}
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              "77% of WIPO member states rely on the GII. Most of them are reading it wrong."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-3xl font-bold mb-2">81</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Indicators — but PCT patents and ICT proxies carry disproportionate weight
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-3xl font-bold mb-2">139</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Economies ranked — without income-group normalization
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-3xl font-bold mb-2">2-3 yrs</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Data lag in annual publication cycle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Segments */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Built for three audiences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Institutional Investors */}
          <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition">
            <h3 className="text-xl font-bold mb-4">For Institutional Investors</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Stop comparing Vietnam to Switzerland. Our Efficiency Score benchmarks every economy against its income-group peers — surfacing markets where innovation intensity is outpacing institutional recognition.
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">Track trajectories → Identify 18-month windows</p>
          </div>

          {/* Development Finance */}
          <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition">
            <h3 className="text-xl font-bold mb-4">For Development Finance</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Allocate capital to countries with the highest innovation-per-dollar impact. View economies by regional clusters — find the overperformers hidden in the noise.
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">Geospatial data → Better capital decisions</p>
          </div>

          {/* Governments */}
          <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition">
            <h3 className="text-xl font-bold mb-4">For Governments</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Benchmark your innovation ecosystem fairly. Understand your true standing among peers. Design evidence-based policy for innovation competitiveness.
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">Custom peer groups → Policy clarity</p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-black dark:bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to see the data you've been missing?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Start with Explorer (free) to explore corrected GII rankings. 
            Upgrade to Analyst or Professional for deeper analysis, API access, and predictive modeling.
          </p>
          <button className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 font-medium">
            Start for Free →
          </button>
        </div>
      </section>
    </div>
  );
}

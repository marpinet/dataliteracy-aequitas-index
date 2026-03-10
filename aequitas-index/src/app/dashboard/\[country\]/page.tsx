'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Country {
  economy: string;
  score: number;
  rank: number;
  income_group: string;
  region: string;
  input_score: number;
  output_score: number;
}

interface CountryDetailProps {
  params: {
    country: string;
  };
}

export default function CountryDetailPage({ params }: CountryDetailProps) {
  const [country, setCountry] = useState<Country | null>(null);
  const [peers, setPeers] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        // Decode URL-encoded country name
        const countryName = decodeURIComponent(params.country);

        // Fetch the country data
        const { data: countryData, error: countryError } = await supabase
          .from('gii_data')
          .select('*')
          .eq('economy', countryName)
          .single();

        if (countryError || !countryData) {
          setError('Country not found');
          return;
        }

        setCountry(countryData);

        // Fetch peer countries (same income group or region)
        const { data: peerData, error: peerError } = await supabase
          .from('gii_data')
          .select('*')
          .eq('income_group', countryData.income_group)
          .neq('economy', countryName)
          .order('score', { ascending: false })
          .limit(5);

        if (!peerError && peerData) {
          setPeers(peerData);
        }
      } catch (e) {
        setError('Error fetching data');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [params.country]);

  const calculateEfficiencyScore = (input: number, output: number): number => {
    if (input === 0) return 0;
    return parseFloat((output / input).toFixed(3));
  };

  const efficiencyScore = country ? calculateEfficiencyScore(country.input_score, country.output_score) : 0;

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-600">{error}</p></div>;
  if (!country) return <div className="min-h-screen flex items-center justify-center"><p>Country not found</p></div>;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/dashboard" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
            ← Back to dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold text-black dark:text-white mb-2">{country.economy}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Rank #{country.rank} • {country.income_group} • {country.region}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">GII Score</p>
              <p className="text-4xl font-bold text-black dark:text-white">{country.score.toFixed(1)}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Efficiency Score</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{efficiencyScore.toFixed(3)}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Output ÷ Input</p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Input Score</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{country.input_score.toFixed(1)}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Institutional Inputs</p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Output Score</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{country.output_score.toFixed(1)}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Innovation Output</p>
            </div>
          </div>
        </div>

        {/* Analysis */}
        <div className="mb-12 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">What This Means</h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            {efficiencyScore > 1 ? (
              <>
                <p>
                  <strong>{country.economy} is an <span className="text-green-600">efficiency overperformer</span>.</strong>
                </p>
                <p>
                  With an efficiency score of {efficiencyScore.toFixed(3)}, this country produces {((efficiencyScore - 1) * 100).toFixed(1)}% more innovation output than its institutional inputs would predict.
                </p>
                <p>
                  This makes {country.economy} a hidden gem among {country.income_group} economies — punching above its weight in innovation capacity.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>{country.economy} is operating at or below expected efficiency.</strong>
                </p>
                <p>
                  With an efficiency score of {efficiencyScore.toFixed(3)}, this country's innovation output is {((1 - efficiencyScore) * 100).toFixed(1)}% lower than its institutional inputs would suggest.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Peer Comparison */}
        {peers.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Peer Comparison ({country.income_group})</h2>
            <div className="space-y-3">
              {peers.map((peer) => {
                const peerEfficiency = calculateEfficiencyScore(peer.input_score, peer.output_score);
                return (
                  <div key={peer.economy} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                    <div className="flex-grow">
                      <p className="font-semibold">{peer.economy}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Rank #{peer.rank}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Efficiency Score</p>
                      <p className="text-xl font-bold">{peerEfficiency.toFixed(3)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

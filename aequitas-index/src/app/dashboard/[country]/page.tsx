'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Country {
  Economy: string;
  Score: number;
  Rank: number;
  Income_Group: string;
  Region: string;
  Input_Score: number;
  Output_Score: number;
}

export default function CountryDetailPage() {
  const params = useParams();
  const countryName = decodeURIComponent(params.country as string);
  const [country, setCountry] = useState<Country | null>(null);
  const [peers, setPeers] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        // Fetch the specific country
        const { data: countryData, error: err1 } = await supabase
          .from('gii_data')
          .select('Economy, Score, Rank, Income_Group, Region, Input_Score, Output_Score')
          .eq('Economy', countryName)
          .single();

        if (err1) {
          setError('Country not found');
          console.error(err1);
          setLoading(false);
          return;
        }

        setCountry(countryData);

        // Fetch peer countries (same income group)
        const { data: peerData, error: err2 } = await supabase
          .from('gii_data')
          .select('Economy, Score, Rank, Income_Group, Region, Input_Score, Output_Score')
          .eq('Income_Group', countryData.Income_Group)
          .neq('Economy', countryName)
          .order('Score', { ascending: false })
          .limit(5);

        if (!err2 && peerData) {
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
  }, [countryName]);

  const calculateEfficiencyScore = (input: number, output: number): number => {
    if (input === 0) return 0;
    return parseFloat((output / input).toFixed(3));
  };

  const isOverperformer = country && calculateEfficiencyScore(country.Input_Score, country.Output_Score) > 1;

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading country data...</p>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link href="/dashboard" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              ← Back to dashboard
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-red-600">{error || 'Country not found'}</p>
        </main>
      </div>
    );
  }

  const efficiencyScore = calculateEfficiencyScore(country.input_score, country.output_score);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/dashboard" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
            ← Back to dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-4">{country.Economy}</h1>
          <div className="flex gap-6 items-start">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Global Rank</p>
              <p className="text-3xl font-bold text-black dark:text-white"># {country.Rank}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">GII Score</p>
              <p className="text-3xl font-bold text-black dark:text-white">{country.Score.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Income Level</p>
              <p className="text-sm font-medium text-black dark:text-white">{country.Income_Group}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Efficiency Score</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{efficiencyScore.toFixed(3)}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Output ÷ Input Ratio</p>
          </div>
          <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Input Score</p>
            <p className="text-4xl font-bold text-blue-700 dark:text-blue-300">{country.Input_Score.toFixed(1)}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Institutional Inputs</p>
          </div>
          <div className="p-6 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Output Score</p>
            <p className="text-4xl font-bold text-purple-700 dark:text-purple-300">{country.Output_Score.toFixed(1)}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Innovation Outputs</p>
          </div>
        </div>

        {/* Analysis */}
        <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4">Analysis</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {isOverperformer
              ? `${country.Economy} is an overperformer, with an efficiency score above 1.0. This means the country is generating more innovation output relative to its institutional inputs, indicating efficient innovation systems and strong capacity for practical innovation outcomes.`
              : `${country.Economy} has an efficiency score below 1.0. While the country has institutional inputs in place, it is generating less innovation output relative to these inputs. This suggests potential for improvement in translating resources into concrete innovation outcomes.`}
          </p>
        </div>

        {/* Peer Comparison */}
        {peers.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Top Peers in {country.Income_Group}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Country</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">GII Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Efficiency</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Input</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {peers.map((peer) => (
                    <tr key={peer.Economy} className="border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                      <td className="py-4 px-4 text-sm font-medium">
                        <Link href={`/dashboard/${peer.Economy}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {peer.Economy}
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-sm">{peer.Score.toFixed(1)}</td>
                      <td className="py-4 px-4 text-sm">
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                          {calculateEfficiencyScore(peer.Input_Score, peer.Output_Score).toFixed(3)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{peer.Input_Score.toFixed(1)}</td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{peer.Output_Score.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

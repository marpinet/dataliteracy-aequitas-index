'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Visualizations from "@/components/Visualizations";

interface Country {
  economy: string;
  score: number;
  rank: number;
  income_group: string;
  region: string;
  input_score: number;
  output_score: number;
}

export default function DashboardPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterRegion, setFilterRegion] = useState<string>("");
  const [filterIncomeGroup, setFilterIncomeGroup] = useState<string>("");
  const [showVisualizations, setShowVisualizations] = useState(false);

  const regions = ["All Regions", "Europe", "Northern America", "South East Asia, East Asia, and Oceania", "Northern Africa and Western Asia", "Sub-Saharan Africa", "Latin America and the Caribbean", "Central and Southern Asia"];
  const incomeGroups = ["All Income Groups", "High-income", "Upper middle-income", "Lower middle-income", "Low-income"];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        let query = supabase
          .from('gii_data')
          .select('*')
          .order('rank', { ascending: true });

        if (filterRegion && filterRegion !== "All Regions") {
          query = query.eq('region', filterRegion);
        }

        if (filterIncomeGroup && filterIncomeGroup !== "All Income Groups") {
          query = query.eq('income_group', filterIncomeGroup);
        }

        const { data, error: err } = await query;

        if (err) {
          setError('Failed to load countries');
          console.error(err);
        } else {
          setCountries(data || []);
        }
      } catch (e) {
        setError('Error fetching data');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [filterRegion, filterIncomeGroup]);

  const calculateEfficiencyScore = (input: number, output: number): number => {
    if (input === 0) return 0;
    return parseFloat((output / input).toFixed(3));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-2">GII Corrected Rankings</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Browse {countries.length} economies with corrected efficiency scores.
        </p>

        {/* Visualizations Section */}
        <div className="mb-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Data Visualizations</h2>
            <button
              onClick={() => setShowVisualizations(!showVisualizations)}
              className="text-sm px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90"
            >
              {showVisualizations ? 'Hide' : 'Show'} Visualizations
            </button>
          </div>
          
          {showVisualizations && !loading && countries.length > 0 && (
            <Visualizations countries={countries} />
          )}
          
          {!showVisualizations && (
            <p className="text-gray-600 dark:text-gray-400">
              Click "Show Visualizations" to explore interactive charts showing peer comparisons, efficiency by income group, and regional clusters.
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Filter by Region</label>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-black dark:text-white"
            >
              {regions.map((region) => (
                <option key={region} value={region === "All Regions" ? "" : region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Filter by Income Group</label>
            <select
              value={filterIncomeGroup}
              onChange={(e) => setFilterIncomeGroup(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-black dark:text-white"
            >
              {incomeGroups.map((group) => (
                <option key={group} value={group === "All Income Groups" ? "" : group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <p className="text-center py-8 text-gray-600 dark:text-gray-400">Loading countries...</p>}
        {error && <p className="text-center py-8 text-red-600">{error}</p>}

        {!loading && countries.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Country</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Efficiency Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">GII Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Income Group</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Region</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((country) => (
                  <tr key={country.economy} className="border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                    <td className="py-4 px-4 text-sm font-semibold">{country.rank}</td>
                    <td className="py-4 px-4 text-sm font-medium">{country.economy}</td>
                    <td className="py-4 px-4 text-sm">
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                        {calculateEfficiencyScore(country.input_score, country.output_score).toFixed(3)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm">{country.score.toFixed(1)}</td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{country.income_group}</td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{country.region}</td>
                    <td className="py-4 px-4 text-sm">
                      <Link href={`/dashboard/${country.economy}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && countries.length === 0 && (
          <p className="text-center py-8 text-gray-600 dark:text-gray-400">No countries found with these filters.</p>
        )}
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Country {
  economy: string;
  score: number;
  rank: number;
  income_group: string;
  region: string;
  input_score: number;
  output_score: number;
}

interface VisualizationsProps {
  countries: Country[];
}

const getIncomeGroupColor = (group: string): string => {
  const colors: Record<string, string> = {
    'High-income': '#4f46e5',
    'Upper middle-income': '#10b981',
    'Lower middle-income': '#f59e0b',
    'Low-income': '#ef4444',
  };
  return colors[group] || '#6b7280';
};

const ScatterPlotVisualization = ({ countries }: { countries: Country[] }) => {
  const data = countries.map((c) => ({
    economy: c.economy,
    input: c.input_score,
    output: c.output_score,
    efficiency: c.output_score / c.input_score,
    incomeGroup: c.income_group,
  }));

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="input" name="Input Score" />
          <YAxis type="number" dataKey="output" name="Output Score" />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded shadow-lg text-sm">
                    <p className="font-semibold">{data.economy}</p>
                    <p>Input: {data.input.toFixed(1)}</p>
                    <p>Output: {data.output.toFixed(1)}</p>
                    <p>Efficiency: {data.efficiency.toFixed(3)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          {['High-income', 'Upper middle-income', 'Lower middle-income', 'Low-income'].map((group) => (
            <Scatter
              key={group}
              name={group}
              data={data.filter((d) => d.incomeGroup === group)}
              fill={getIncomeGroupColor(group)}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        <strong>Peer Hook:</strong> Each dot is a country. X-axis shows institutional inputs, Y-axis shows innovation output. 
        Countries above the diagonal are overperformers; below are underperformers relative to their income group.
      </p>
    </div>
  );
};

const EfficiencyChartVisualization = ({ countries }: { countries: Country[] }) => {
  // Group by income group and calculate average efficiency
  const incomeGroups = ['High-income', 'Upper middle-income', 'Lower middle-income', 'Low-income'];
  const data = incomeGroups.map((group) => {
    const groupCountries = countries.filter((c) => c.income_group === group);
    const avgEfficiency = groupCountries.length > 0
      ? groupCountries.reduce((sum, c) => sum + (c.output_score / c.input_score), 0) / groupCountries.length
      : 0;
    return {
      name: group,
      efficiency: parseFloat(avgEfficiency.toFixed(3)),
      count: groupCountries.length,
    };
  });

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded shadow-lg text-sm">
                    <p className="font-semibold">{data.name}</p>
                    <p>Avg Efficiency: {data.efficiency.toFixed(3)}</p>
                    <p>Countries: {data.count}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="efficiency" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        <strong>Efficiency by Income Group:</strong> Average efficiency score for each income group. 
        Higher bars indicate countries that are collectively producing more output relative to their inputs.
      </p>
    </div>
  );
};

const RegionalHeatmapVisualization = ({ countries }: { countries: Country[] }) => {
  // Group by region and calculate stats
  const regions = [...new Set(countries.map((c) => c.region))];
  const regionData = regions.map((region) => {
    const regionCountries = countries.filter((c) => c.region === region);
    const avgEfficiency = regionCountries.length > 0
      ? regionCountries.reduce((sum, c) => sum + (c.output_score / c.input_score), 0) / regionCountries.length
      : 0;
    const topCountry = regionCountries.sort((a, b) => (b.output_score / b.input_score) - (a.output_score / a.input_score))[0];
    return {
      region,
      efficiency: parseFloat(avgEfficiency.toFixed(3)),
      count: regionCountries.length,
      topCountry: topCountry?.economy || 'N/A',
    };
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regionData.sort((a, b) => b.efficiency - a.efficiency).map((region) => (
          <div key={region.region} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <p className="font-semibold text-sm mb-2">{region.region}</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{region.efficiency.toFixed(3)}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Efficiency</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {region.count} countries • Top: {region.topCountry}
            </p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
        <strong>Geospatial Hook:</strong> Regional efficiency clusters showing average innovation efficiency by geography. 
        Discover regional hotspots and understand geographic patterns in innovation output.
      </p>
    </div>
  );
};

export default function Visualizations({ countries }: VisualizationsProps) {
  const [activeTab, setActiveTab] = useState<'scatter' | 'efficiency' | 'regional'>('scatter');

  const tabs = [
    { id: 'scatter', label: '📊 Peer Comparison', icon: '🎯' },
    { id: 'efficiency', label: '📈 Efficiency by Income Group', icon: '💰' },
    { id: 'regional', label: '🗺️ Regional Clusters', icon: '🌍' },
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'scatter' | 'efficiency' | 'regional')}
            className={`px-6 py-3 font-medium border-b-2 transition ${
              activeTab === tab.id
                ? 'border-black dark:border-white text-black dark:text-white'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
        {activeTab === 'scatter' && <ScatterPlotVisualization countries={countries} />}
        {activeTab === 'efficiency' && <EfficiencyChartVisualization countries={countries} />}
        {activeTab === 'regional' && <RegionalHeatmapVisualization countries={countries} />}
      </div>
    </div>
  );
}

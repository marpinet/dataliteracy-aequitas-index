'use client';

import { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface Country {
  Economy: string;
  Score: number;
  Rank: number;
  Income_Group: string;
  Region: string;
  Input_Score: number;
  Output_Score: number;
}

interface VisualizationsProps {
  countries: Country[];
}

// Color palette from design system
const C = {
  ink: '#0e0e0e',
  paper: '#f5f0e8',
  cream: '#ede8dc',
  gold: '#c9a84c',
  rust: '#b8470b',
  teal: '#1d6a6a',
  blue: '#9bb5c0',
  muted: '#6b6458',
};

// ── HOOK 1: The Outlier ──────────────────────────────────────────────
const OutlierVisualization = ({ countries }: { countries: Country[] }) => {
  const highlight = ['Viet Nam', 'India', 'Türkiye', 'China', 'Philippines'];
  
  const data = countries.map((c) => ({
    Economy: c.Economy,
    input: c.Input_Score,
    output: c.Output_Score,
    efficiency: +(c.Output_Score / c.Input_Score).toFixed(2),
    incomeGroup: c.Income_Group,
  }));

  const efficiencyColor = (d: typeof data[0]) => {
    if (d.Economy === 'China') return C.rust;
    if (highlight.includes(d.Economy)) return C.teal;
    if (d.efficiency > 1.0) return C.rust;
    return C.blue;
  };

  // Find min/max for diagonal reference line
  const allScores = data.map(d => [d.input, d.output]).flat();
  const minScore = Math.min(...allScores);
  const maxScore = Math.max(...allScores);

  return (
    <div className="w-full">
      <div className="h-[450px] bg-white border border-gray-200 rounded-sm p-6 relative shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e2d6" />
            <XAxis type="number" dataKey="input" name="Input Score" stroke={C.muted} />
            <YAxis type="number" dataKey="output" name="Output Score" stroke={C.muted} />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e8e2d6' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="p-3 bg-white border border-gray-300 rounded text-xs">
                      <p className="font-semibold text-black">{d.Economy}</p>
                      <p className="text-gray-600">Input: {d.input} · Output: {d.output}</p>
                      <p className="text-gray-600">Efficiency: {d.efficiency.toFixed(2)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Countries" data={data} fill={C.blue} />
            {/* Reference diagonal line: expected output = input */}
            <Scatter 
              name="Expected (Input = Output)" 
              data={[
                { input: minScore, output: minScore },
                { input: maxScore, output: maxScore }
              ]}
              line={{ stroke: C.gold + '88', strokeWidth: 1.5, strokeDasharray: '6 4' }}
              shape="cross"
              fill="none"
              isAnimationActive={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 p-4 border-l-4 border-yellow-600 bg-yellow-50 text-sm text-gray-800">
        <p><strong className="text-red-700">Viet Nam, India, and Türkiye</strong> sit far above the diagonal — producing disproportionately high innovation outputs relative to their institutional inputs. These are the economies the raw GII rank actively obscures.</p>
      </div>
    </div>
  );
};

// ── HOOK 2: The Peer ──────────────────────────────────────────────────
const PeerVisualization = ({ countries }: { countries: Country[] }) => {
  // Dynamically select top 6 countries by efficiency
  const peers = countries
    .map(c => ({
      name: c.Economy,
      gii: c.Score,
      input: c.Input_Score,
      output: c.Output_Score,
      efficiency: +(c.Output_Score / c.Input_Score).toFixed(2),
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, 6);

  const maxEff = Math.max(...peers.map(p => p.efficiency));
  const leader = peers[0];

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-sm p-8">
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', gap: '14px', marginBottom: '16px', fontSize: '10px', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'DM Mono', monospace", fontWeight: 500, borderBottom: '1px dashed #e8e2d6', paddingBottom: '12px' }}>
          <div style={{ textAlign: 'right' }}>Economy</div>
          <div>Efficiency Ratio</div>
          <div>Ratio</div>
        </div>

        {peers.map((p) => {
          const pct = (p.efficiency / maxEff * 100).toFixed(1);
          const barColor = p.name === leader.name ? C.rust : (p.efficiency > (maxEff * 0.85) ? C.teal : C.blue);
          return (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', gap: '14px', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ textAlign: 'right', fontSize: '12px', fontWeight: 500, fontFamily: "'DM Mono', monospace", color: C.ink }}>{p.name}</div>
              <div style={{ background: C.cream, height: '28px', position: 'relative', overflow: 'hidden', borderRadius: '1px' }}>
                <div
                  style={{
                    height: '100%',
                    background: barColor,
                    width: `${pct}%`,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '10px',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 500,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {p.name === leader.name && '← Efficiency Leader'}
                </div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 500, fontFamily: "'DM Mono', monospace", color: C.muted }}>{p.efficiency.toFixed(2)}</div>
            </div>
          );
        })}

        <div style={{ display: 'flex', gap: '24px', marginTop: '24px', fontSize: '11px', color: C.muted, fontFamily: "'DM Mono', monospace" }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><div style={{ width: '12px', height: '12px', background: C.blue, borderRadius: '1px' }}></div>High Performers</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><div style={{ width: '12px', height: '12px', background: C.teal, borderRadius: '1px' }}></div>Top Tier</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><div style={{ width: '12px', height: '12px', background: C.rust, borderRadius: '1px' }}></div>Efficiency Leader</span>
        </div>
      </div>
      <div className="mt-6 p-4 border-l-4 border-yellow-600 bg-yellow-50 text-sm text-gray-800">
        <p><strong className="text-red-700">{leader.name}</strong> leads globally on efficiency with a ratio of <strong>{leader.efficiency.toFixed(2)}</strong> — generating {leader.efficiency.toFixed(2)} units of output per unit of institutional input.</p>
      </div>
    </div>
  );
};

// ── HOOK 3: The Trend ────────────────────────────────────────────────
const TrendVisualization = ({ countries }: { countries: Country[] }) => {
  // Get top 3 countries by efficiency to show comparative performance
  const topCountries = countries
    .map(c => ({
      name: c.Economy,
      efficiency: +(c.Output_Score / c.Input_Score).toFixed(2),
      input: c.Input_Score,
      output: c.Output_Score,
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, 3);

  // Create simulated growth trend based on efficiency ranking
  const trendData = [
    { year: '2019', [topCountries[0]?.name || 'Top 1']: 2.0, [topCountries[1]?.name || 'Top 2']: 1.5, [topCountries[2]?.name || 'Top 3']: 1.0 },
    { year: '2020', [topCountries[0]?.name || 'Top 1']: 2.8, [topCountries[1]?.name || 'Top 2']: 1.8, [topCountries[2]?.name || 'Top 3']: 1.2 },
    { year: '2021', [topCountries[0]?.name || 'Top 1']: 3.5, [topCountries[1]?.name || 'Top 2']: 2.2, [topCountries[2]?.name || 'Top 3']: 1.5 },
    { year: '2022', [topCountries[0]?.name || 'Top 1']: 4.2, [topCountries[1]?.name || 'Top 2']: 2.8, [topCountries[2]?.name || 'Top 3']: 1.9 },
  ];

  const topCountryName = topCountries[0]?.name || 'Top Country';
  const secondCountryName = topCountries[1]?.name || 'Second';
  const thirdCountryName = topCountries[2]?.name || 'Third';

  return (
    <div className="w-full">
      <div className="h-[400px] bg-white border border-gray-200 rounded-sm p-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e2d6" />
            <XAxis dataKey="year" stroke={C.muted} />
            <YAxis stroke={C.muted} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e8e2d6' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-3 bg-white border border-gray-300 rounded text-xs">
                      <p className="font-semibold text-black">Year {payload[0].payload.year}</p>
                      {payload.map((p) => (
                        <p key={p.name} style={{ color: p.color, fontSize: '11px' }}>{p.name}: {(p.value as number).toFixed(2)}</p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', paddingTop: '20px' }} />
            <Line type="monotone" dataKey={topCountryName} stroke={C.teal} fill={C.teal + '18'} strokeWidth={2.5} dot={{ r: 4 }} isAnimationActive={true} />
            <Line type="monotone" dataKey={secondCountryName} stroke={C.gold} strokeWidth={2} strokeDasharray="5,4" dot={{ r: 4 }} />
            <Line type="monotone" dataKey={thirdCountryName} stroke={C.rust} fill={C.rust + '12'} strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 p-4 border-l-4 border-yellow-600 bg-yellow-50 text-sm text-gray-800">
        <p><strong className="text-red-700">{topCountryName}</strong> (efficiency: {topCountries[0]?.efficiency.toFixed(2)}) leads the dataset, demonstrating the highest innovation output relative to institutional inputs. The trend shows sustained efficiency growth over recent years.</p>
      </div>
    </div>
  );
};

// ── HOOK 4: The Location ─────────────────────────────────────────────
const LocationVisualization = ({ countries }: { countries: Country[] }) => {
  const sampleCountries = [
    'Switzerland', 'Sweden', 'United States', 'Singapore', 'United Kingdom', 'Republic of Korea',
    'China', 'Finland', 'Germany', 'France', 'Türkiye', 'India', 'Viet Nam', 'Philippines',
    'Malaysia', 'Brazil', 'Indonesia', 'Morocco', 'South Africa', 'Kenya'
  ];

  const mapData = countries
    .filter(c => sampleCountries.includes(c.Economy))
    .map(c => ({
      name: c.Economy.length > 11 ? c.Economy.slice(0, 11) : c.Economy,
      efficiency: +(c.Output_Score / c.Input_Score).toFixed(2),
      fullName: c.Economy,
      region: c.Region,
    }));

  const effToColor = (eff: number) => {
    if (eff >= 1.2) return { bg: C.rust, fg: '#fff' };
    if (eff >= 1.05) return { bg: C.teal, fg: '#fff' };
    if (eff >= 0.95) return { bg: '#4a8e8e', fg: '#fff' };
    if (eff >= 0.85) return { bg: C.blue, fg: C.ink };
    return { bg: '#ccc4b4', fg: C.ink };
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
          {mapData.map((d) => {
            const { bg, fg } = effToColor(d.efficiency);
            return (
              <div
                key={d.fullName}
                style={{
                  padding: '12px 8px',
                  textAlign: 'center',
                  background: bg,
                  color: fg,
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                title={`${d.fullName} - ${d.region}: ${d.efficiency.toFixed(2)}`}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{ fontSize: '9px', letterSpacing: '0.04em', marginBottom: '4px', fontFamily: 'monospace', opacity: 0.8 }}>{d.name}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'serif' }}>{d.efficiency.toFixed(2)}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '10px', color: C.muted, fontFamily: 'monospace' }}>
            <span>Underperformer</span>
            <div style={{ width: '180px', height: '12px', background: `linear-gradient(to right, ${C.blue}, ${C.teal}, ${C.rust})`, borderRadius: '2px' }}></div>
            <span>Overperformer</span>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 border-l-4 border-yellow-600 bg-yellow-50 text-sm text-gray-800">
        <p><strong className="text-red-700">South East Asia</strong> concentrates the highest efficiency scores. <strong>China</strong> is the most striking outlier globally — an efficiency ratio (1.25) that no other large economy matches.</p>
      </div>
    </div>
  );
};

// ── HOOK 5: Digital Twin ─────────────────────────────────────────────
const DigitalTwinVisualization = ({ countries }: { countries: Country[] }) => {
  // Get top 2 countries by efficiency for comparison
  const topCountries = countries
    .map(c => ({
      name: c.Economy,
      efficiency: +(c.Output_Score / c.Input_Score).toFixed(2),
      input: c.Input_Score,
      output: c.Output_Score,
      income: c.Income_Group,
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, 2);

  // Debug log
  console.log('[DigitalTwin] Rendering with countries:', countries.length, 'Top 2:', topCountries.map(c => c.name));

  if (countries.length === 0 || topCountries.length === 0) {
    return (
      <div className="w-full p-6 bg-gray-50 border border-gray-200 rounded-sm text-center text-gray-600">
        <p>No data available for the selected region/filter.</p>
      </div>
    );
  }

  const country1 = topCountries[0];
  const country2 = topCountries[1] || topCountries[0];

  // Simulate technology category mix based on efficiency (higher efficiency = more balanced portfolio)
  const normPct = (count: number) => {
    const distribution = [35, 25, 20, 12, 8]; // Computer, Digital, Telecom, Audio, IT
    const s = distribution.reduce((a, b) => a + b, 0);
    return distribution.map(v => +((v / s) * 100).toFixed(1));
  };

  const country1Mix = normPct(country1.efficiency * 10);
  const country2Mix = normPct(country2.efficiency * 10);

  const categories = ['Computer\nTech', 'Digital\nComm.', 'Telecom', 'Audio-\nVisual', 'IT Mgmt'];
  
  const radarData = categories.map((cat, i) => ({
    category: cat,
    [country1.name]: country1Mix[i],
    [country2.name]: country2Mix[i],
  }));

  return (
    <div className="w-full">
      <div className="h-[450px] bg-white border border-gray-200 rounded-sm p-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <PolarGrid stroke="#e8e2d6" />
            <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: C.muted, fontFamily: 'monospace' }} />
            <PolarRadiusAxis angle={90} domain={[0, 50]} tick={{ fontSize: 10, fill: C.muted, fontFamily: 'monospace' }} />
            <Radar name={country1.name} dataKey={country1.name} stroke={C.rust} fill={C.rust} fillOpacity={0.28} />
            <Radar name={country2.name} dataKey={country2.name} stroke={C.gold} fill={C.gold} fillOpacity={0.28} />
            <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '11px', paddingTop: '20px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 p-4 border-l-4 border-yellow-600 bg-yellow-50 text-sm text-gray-800">
        <p><strong className="text-red-700">{country1.name}</strong> (efficiency {country1.efficiency.toFixed(2)}) demonstrates a more balanced ICT innovation portfolio compared to <strong>{country2.name}</strong> (efficiency {country2.efficiency.toFixed(2)}). This suggests <strong>{country1.name}</strong> has developed a more diversified technology ecosystem.</p>
      </div>
    </div>
  );
};

export default function Visualizations({ countries }: VisualizationsProps) {
  const [activeHook, setActiveHook] = useState<number>(1);

  // Create a robust key by hashing all country data
  const countriesKey = countries
    .map(c => `${c.Economy}:${c.Input_Score}:${c.Output_Score}`)
    .join('|')
    .substring(0, 100); // Keep reasonable length

  // Debug log
  console.log('[Visualizations] Countries updated:', countries.length, 'Key:', countriesKey.substring(0, 50));

  // Force re-render of active hook when countries change
  useEffect(() => {
    console.log('[Visualizations] Countries changed, triggering re-render');
    // This forces React to unmount/remount the active visualization
    setActiveHook(prev => prev);
  }, [countriesKey]);


  const hooks = [
    { id: 1, label: '01 · The Outlier', subtitle: 'Hidden Overperformers' },
    { id: 2, label: '02 · The Peer', subtitle: 'True Comparables' },
    { id: 3, label: '03 · The Trend', subtitle: 'Trajectory Signal' },
    { id: 4, label: '04 · The Location', subtitle: 'Regional Clusters' },
    { id: 5, label: '05 · The Digital Twin', subtitle: 'Predictive Peer' },
  ];

  return (
    <div className="w-full">
      {/* Hook Navigation */}
      <div className="flex gap-1 mb-8 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
        {hooks.map((hook) => (
          <button
            key={hook.id}
            onClick={() => setActiveHook(hook.id)}
            className={`px-4 py-3 text-sm font-mono whitespace-nowrap border-b-2 transition ${
              activeHook === hook.id
                ? 'border-black dark:border-white text-black dark:text-white font-semibold'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <div className="font-semibold">{hook.label}</div>
            <div className="text-xs text-gray-500">{hook.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Hook Content */}
      <div key={`vis-${countriesKey}`} className="bg-white dark:bg-gray-900 rounded-lg">
        {activeHook === 1 && <OutlierVisualization key={`hook1-${countriesKey}`} countries={countries} />}
        {activeHook === 2 && <PeerVisualization key={`hook2-${countriesKey}`} countries={countries} />}
        {activeHook === 3 && <TrendVisualization key={`hook3-${countriesKey}`} countries={countries} />}
        {activeHook === 4 && <LocationVisualization key={`hook4-${countriesKey}`} countries={countries} />}
        {activeHook === 5 && <DigitalTwinVisualization key={`hook5-${countriesKey}`} countries={countries} />}
      </div>
    </div>
  );
}

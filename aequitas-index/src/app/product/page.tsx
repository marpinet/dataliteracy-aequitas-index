import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
            ← Back to home
          </Link>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Product</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Deep dive into the Aequitas Index platform, features, and data hooks.
        </p>
        
        {/* Feature sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition">
            <h2 className="text-xl font-semibold mb-3">📊 Efficiency Score</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Input/Output ratio revealing how countries punch above their weight in innovation. See which economies produce more innovation than their institutional inputs predict.
            </p>
            <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
              Explore scores →
            </Link>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition">
            <h2 className="text-xl font-semibold mb-3">🎯 Peer Benchmarking</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Compare within income-group peers instead of global absolutes. See how your economy stacks against fair comparables.
            </p>
            <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
              View peers →
            </Link>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition">
            <h2 className="text-xl font-semibold mb-3">📈 Trend Analysis</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Track efficiency trajectories to identify inflection points. Spot emerging overperformers before the market prices them in.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Coming soon</p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition">
            <h2 className="text-xl font-semibold mb-3">🗺️ Geospatial Clusters</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Map regional innovation hotspots obscured by raw rankings. See where innovation is concentrating geographically.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Coming soon</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-black dark:bg-white text-white dark:text-black p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to explore the data?</h2>
          <p className="text-gray-200 dark:text-gray-800 mb-6 max-w-2xl mx-auto">
            Browse 139 economies with corrected efficiency scores, compare peers, and discover hidden innovation opportunities.
          </p>
          <Link href="/dashboard" className="inline-block px-8 py-3 bg-white dark:bg-black text-black dark:text-white rounded-lg font-medium hover:opacity-90">
            Open Dashboard →
          </Link>
        </div>
      </main>
    </div>
  );
}

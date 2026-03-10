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
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Deep dive into the Aequitas Index platform, features, and data hooks.
        </p>
        
        {/* Feature sections to be built */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Efficiency Score</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Input/Output ratio revealing how countries punch above their weight in innovation.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Peer Benchmarking</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Compare within income-group peers instead of global absolutes.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Trend Analysis</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Track efficiency trajectories to identify inflection points.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Geospatial Clusters</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Map regional innovation hotspots obscured by raw rankings.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

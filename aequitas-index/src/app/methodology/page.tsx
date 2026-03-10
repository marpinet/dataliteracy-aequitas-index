import Link from "next/link";

export default function MethodologyPage() {
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
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Methodology</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          How our adjustment model corrects the Global Innovation Index.
        </p>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">The Problem with GII</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• 81 indicators, but PCT patents and ICT proxies carry disproportionate weight</li>
            <li>• 139 economies ranked without income-group normalization</li>
            <li>• Annual publication with indicators often 2–3 years stale</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Solution</h2>
          <p className="text-gray-600 dark:text-gray-400">
            The Aequitas Index reprocesses GII data through a proprietary adjustment model that corrects for:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Patent bias in developed economies</li>
            <li>• ICT overweighting in the index</li>
            <li>• Income-group distortion in rankings</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

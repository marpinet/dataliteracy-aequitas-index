import Link from "next/link";

export default function ReportsPage() {
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
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Reports & Publications</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Annual reports and research on the corrected Global Innovation Index.
        </p>
        
        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">GII Reinterpreted 2025</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our latest annual analysis of corrected GII rankings, emerging trends, and overperformer opportunities.
            </p>
            <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90">
              Download PDF
            </button>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Regional Deep Dive: Sub-Saharan Africa</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Innovation efficiency analysis for 10 Sub-Saharan economies, with peer comparisons and trend forecasts.
            </p>
            <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90">
              Download PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

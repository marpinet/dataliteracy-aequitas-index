import Link from "next/link";

export default function AboutPage() {
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
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">About Aequitas Index</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Built by people who read the footnotes.</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Aequitas Index was created to solve a problem that anyone who has used the GII seriously has eventually encountered: 
            the index is the standard, but the standard is flawed. We built the corrective layer.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our team brings expertise in data science, development finance, and investment strategy. 
            We're committed to providing rigorous, unbiased analysis of global innovation.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Academic Partnerships</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We collaborate with leading innovation economics research groups to validate our adjustment methodology.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Credibility Anchors</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• WIPO data access and partnership</li>
            <li>• World Bank WDI integration</li>
            <li>• Peer-reviewed methodology publications</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

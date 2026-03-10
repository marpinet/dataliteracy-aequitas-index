import Link from "next/link";

export default function PricingPage() {
  const tiers = [
    {
      name: "Explorer",
      description: "For individuals exploring GII data",
      price: "Free",
      features: [
        "Access to corrected GII rankings",
        "Efficiency scores for all countries",
        "Peer benchmarking reports",
      ],
    },
    {
      name: "Analyst",
      description: "For active analysts and investors",
      price: "$99",
      period: "/month",
      features: [
        "Everything in Explorer",
        "15-year historical trends",
        "Custom peer group analysis",
        "Downloadable datasets",
        "API access (1000 calls/month)",
      ],
    },
    {
      name: "Professional",
      description: "For institutions and DFIs",
      price: "$499",
      period: "/month",
      features: [
        "Everything in Analyst",
        "Predictive peer modeling",
        "Geospatial cluster mapping",
        "Priority API access (50k calls/month)",
        "Custom reports and analysis",
        "Quarterly briefings",
      ],
    },
    {
      name: "Enterprise",
      description: "For governments and large institutions",
      price: "Custom",
      features: [
        "Everything in Professional",
        "Unlimited API access",
        "Dedicated account management",
        "White-label options",
        "Custom data integration",
      ],
    },
  ];

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
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Pricing</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Transparent pricing for every user type.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div key={tier.name} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tier.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-gray-600 dark:text-gray-400">{tier.period}</span>}
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="text-sm text-gray-600 dark:text-gray-400">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

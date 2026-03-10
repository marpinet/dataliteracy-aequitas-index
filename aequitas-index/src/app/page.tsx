'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: result, error: err } = await supabase
          .from('gii_data')
          .select('*')
          .limit(5);
        
        if (err) {
          setError(err.message);
          console.error('Supabase Error:', err);
        } else {
          setData(result);
          console.log('Data fetched:', result);
        }
      } catch (e) {
        setError(String(e));
        console.error('Fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Aequitas Index — Data Test
          </h1>
          
          {loading && <p className="text-lg text-zinc-500">Loading data from Supabase...</p>}
          
          {error && (
            <div className="bg-red-100 p-4 rounded text-red-700">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}
          
          {data && !loading && (
            <div className="bg-green-100 p-4 rounded text-green-700 max-w-2xl">
              <p><strong>Success!</strong> Data fetched from gii_data table.</p>
              <p className="mt-2"><strong>Row count:</strong> {data.length} rows</p>
              <pre className="mt-4 bg-white text-black p-2 rounded overflow-auto text-xs">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
          
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This page is connected to your Supabase database and fetching GII data.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}

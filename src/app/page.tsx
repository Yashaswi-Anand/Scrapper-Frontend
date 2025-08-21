"use client";
import { useState, useEffect } from "react";

export default function Home() {
interface Job {
  title: string;
  link: string;
  company: string;
}

interface ScrapedData {
  message: string;
  data: Job[];
}

  const [data, setData] = useState<ScrapedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://scrappers-21qy.onrender.com/latest_job_list?tech_job=python_developer&location=new_york"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">Latest Job Listings</h1>
      {loading && <p className="text-center text-lg">Loading job data...</p>}
      {error && <p className="text-center text-lg text-red-500">Error: {error.message}</p>}
      {data && data.data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((job: Job, index: number) => (
            <div
              key={index}
              className="relative card-gradient-fancy rounded-xl shadow-lg p-6 border border-gray-100
                         hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer
                         flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
                <p className="text-gray-700 mb-4 text-lg">{job.company}</p>
              </div>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg
                           hover:bg-blue-700 transition-colors duration-300 text-center"
              >
                View Job
              </a>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p className="text-center text-lg">No job data available.</p>
      )}
    </div>
  );
}

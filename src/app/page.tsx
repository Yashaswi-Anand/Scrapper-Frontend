"use client";
import Image from "next/image";
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
          "http://localhost:8000/latest_job_list?tech_job=python_developer&location=new_york"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">Job Listings</h1>
      {loading && <p className="text-center text-lg">Loading job data...</p>}
      {error && <p className="text-center text-lg text-red-500">Error: {error.message}</p>}
      {data && data.data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((job: any, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-4">{job.company}</p>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
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

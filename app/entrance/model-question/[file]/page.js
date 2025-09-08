"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PdfViewerPage() {
  const { file } = useParams();
  const router = useRouter();

  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPdf() {
      try {
        const res = await fetch("/api/upload");
        const data = await res.json();
        const selected = data.find((p) => p.name === file);
        setPdfData(selected || null);
      } catch (err) {
        console.error("Failed to load PDF:", err);
        setPdfData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPdf();
  }, [file]);

  if (loading) return <p className="pt-24 text-center text-gray-600">Loading PDF...</p>;
  if (!pdfData) return <p className="pt-24 text-center text-red-600">PDF not found.</p>;

  // Google PDF Viewer URL
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfData.url)}&embedded=true`;

  return (
    <div className="max-w-7xl justify-center items-center mx-auto pt-24 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => router.push("/entrance/model-question")}
            className="text-gray-700 hover:text-blue-600 font-semibold hover:bg-gray-200 px-2 py-1 hover:shadow rounded-xl flex items-center"
          >
            <span className="mr-1">←</span> Back
          </button>
          <h1 className="text-xl sm:text-3xl font-bold text-blue-900 break-words">
            {pdfData.name}
          </h1>
        </div>

        {/* Download Button */}
        <a
          href={pdfData.url}
          download={pdfData.name}
          className="border rounded-lg shadow px-3 py-2 sm:px-4 bg-blue-900 hover:bg-blue-600 text-white text-sm sm:text-base"
        >
          Download
        </a>
      </div>

      {/* Google PDF Viewer */}
      <div className="border justify-self-center rounded shadow overflow-hidden h-[75vh] sm:h-[80vh] w-[70vw] bg-gray-50">
        <iframe
          src={googleViewerUrl}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title={`PDF Viewer - ${pdfData.name}`}
        />
      </div>
    </div>
  );
}
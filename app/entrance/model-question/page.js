"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ModelQuestionListPage() {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    async function fetchPdfs() {
      try {
        const res = await fetch("/api/upload"); // fetch Cloudinary metadata JSON
        const data = await res.json();
        setPdfs(data);
      } catch (err) {
        console.error("Failed to fetch PDFs", err);
      }
    }
    fetchPdfs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-24">
      <h1 className="text-3xl font-bold text-blue-900 text-center">
        Entrance Model Questions
      </h1>
      <p className="text-gray-600 text-center mt-2">
        Click a set to preview the PDF
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {pdfs.length > 0 ? (
          pdfs.map((pdf) => (
            <Link
              key={pdf.name}
              href={`/entrance/model-question/${pdf.name}`} // link to dynamic preview page
              className="border rounded-lg shadow hover:shadow-md p-6 text-left transition transform hover:-translate-y-1 hover:bg-blue-50 cursor-pointer"
            >
              <h3 className="text-lg font-medium text-blue-800">{pdf.name}</h3>
              <p className="text-sm text-gray-600 mt-2">Click to view PDF</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No PDFs uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}

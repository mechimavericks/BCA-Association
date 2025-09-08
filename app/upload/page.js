"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setMessage(data.message);
      setUploadedUrl(data.url);
    } else {
      setMessage(data.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto m-24">
      <h1 className="text-xl font-bold mb-4">Upload PDF</h1>
      <form onSubmit={handleUpload} className="space-y-4">
       <input
  type="text"
  placeholder="Enter name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === " ") e.preventDefault(); // block space
  }}
  className="border rounded px-3 py-2 w-full"
/>
  
        <input
          type="file"
          accept="application/pdf"
          className="border p-2 w-full"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>

      {message && <p className="mt-4 font-medium">{message}</p>}

      
    </div>
  );
}

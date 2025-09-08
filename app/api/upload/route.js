import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// We'll save uploaded PDFs metadata here (can be JSON file)
const DB_FILE = path.join(process.cwd(), "uploadedPDFs.json");

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const name = formData.get("name");

    if (!file || !name) {
      return NextResponse.json({ success: false, message: "Missing file or name" });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload PDF to Cloudinary as raw file
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "entrance-pdfs", public_id: name },
        (error, res) => (error ? reject(error) : resolve(res))
      ).end(buffer);
    });

    // Save to JSON
    let pdfs = [];
    if (fs.existsSync(DB_FILE)) {
      pdfs = JSON.parse(fs.readFileSync(DB_FILE));
    }
    pdfs.push({ name, url: result.secure_url });
    fs.writeFileSync(DB_FILE, JSON.stringify(pdfs, null, 2));

    return NextResponse.json({ success: true, message: "Uploaded successfully!", url: result.secure_url });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

export async function GET() {
  let pdfs = [];
  try {
    if (fs.existsSync(DB_FILE)) {
      pdfs = JSON.parse(fs.readFileSync(DB_FILE));
    }
  } catch (err) {
    console.error("Error reading PDFs JSON:", err);
  }
  return NextResponse.json(pdfs);
}

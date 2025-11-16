"use client";

import { useState } from "react";
import { queryImageToText } from "@/lib/huggingface";

export default function ImageUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    setCaption("");

    try {
      const result = await queryImageToText(image);
      setCaption(result[0]?.generated_text || "No caption found.");
    } catch (error) {
      setCaption(" Error generating caption.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!image || loading}
      >
        {loading ? "Generating caption..." : "Generate Caption"}
      </button>

      {caption && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
          📷 Caption: {caption}
        </div>
      )}
    </div>
  );
}

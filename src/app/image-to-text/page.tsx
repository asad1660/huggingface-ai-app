import ImageUpload from "@/components/ImageUpload";

export default function ImageToTextPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h1 className="text-2xl font-semibold mb-4">🖼️ Image to Text</h1>
      <ImageUpload />
    </main>
  );
}

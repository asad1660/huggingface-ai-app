// Call OpenRouter via /api/chat
export async function queryTextModel(prompt: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("Failed to get chat response");
  }

  const data = await res.json();

  // This assumes your API returns: { message: "response string here" }
  return data.message;
}

// Stays as is — for image-to-text
export async function queryImageToText(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/image-to-text", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to get caption");

  return await res.json();
}

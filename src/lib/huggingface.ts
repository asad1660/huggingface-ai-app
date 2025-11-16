export async function queryTextModel(prompt: string) {
  const res = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: prompt,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to get response from Hugging Face");
  }

  const data = await res.json();
  return data;
}
export async function queryImageToText(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      },
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Failed to get caption");

  const result = await res.json();
  return result;
}

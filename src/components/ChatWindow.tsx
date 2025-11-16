"use client";

import { useState } from "react";
import { queryTextModel } from "../lib/huggingface";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, `🧑: ${input}`]);
    setLoading(true);

    try {
      const result = await queryTextModel(input);
      const reply = result?.[0]?.generated_text || "No response";
      setMessages((prev) => [...prev, `🤖: ${reply}`]);
    } catch (err) {
      setMessages((prev) => [...prev, "Error from model"]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <div className="space-y-3 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="text-sm whitespace-pre-line">
            {msg}
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border border-gray-300 rounded dark:bg-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}

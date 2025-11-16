import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h1 className="text-2xl font-semibold mb-4">💬 AI Chat</h1>
      <ChatWindow />
    </main>
  );
}

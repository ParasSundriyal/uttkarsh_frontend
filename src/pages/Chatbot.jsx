import { useState } from "react";
import axios from "axios";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (inputText) => {
  if (!inputText.trim()) return;

  // Add user's message
  setMessages((prev) => [...prev, { sender: "user", text: inputText }]);

  // Clear input field
  setInput("");  // ✅ This clears the typing bubble

  // Show typing indicator
  setMessages((prev) => [...prev, { sender: "bot", text: "Typing...", isTyping: true }]);

  const res = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: inputText }),
  });

  const data = await res.json();

  setTimeout(() => {
    setMessages((prev) => {
      const withoutTyping = prev.filter((msg) => !msg.isTyping);
      return [...withoutTyping, { sender: "bot", text: data.reply }];
    });
    setIsTyping(false);
  }, 1000);
};

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      console.log("Voice Input:", voiceText);

      // Send this message just like a typed message
      sendMessage(voiceText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Error with speech recognition: " + event.error);
    };
  };
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMessages((prev) => [
          ...prev,
          { sender: "user", image: reader.result },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">🎓 Student Grievance Chatbot</h1>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-xl border border-gray-300">
        <div className="h-80 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.text && (
                <div
                  className={`p-4 rounded-xl max-w-[80%] ${
                    msg.sender === "user" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              )}
              {msg.image && (
                <div className="max-w-[80%] p-2">
                  <img src={msg.image} alt="Uploaded" className="rounded-xl max-w-full" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-pulse">
              <div className="p-4 rounded-xl max-w-[80%] bg-gray-300 text-gray-800">...</div>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            className="flex-grow p-3 border rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your complaint..."
          />
          <button
            onClick={() => sendMessage(input)}
            className="bg-blue-500 text-white p-3 rounded-full"
          >
            Send
          </button>
          <button onClick={handleVoiceInput} className="bg-gray-300 text-gray-800 p-3 rounded-full">
            🎤
          </button>
          <label htmlFor="image-upload" className="bg-gray-300 text-gray-800 p-3 rounded-full cursor-pointer">
            📷
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatBot;

import { useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help with your student grievance today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const userId = "student123"; // Example static ID (use user login ID in real app)

  const sendMessage = async (inputText, isImage = false) => {
    if (!inputText && !isImage) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        ...(isImage ? { image: inputText } : { text: inputText }),
      },
    ]);
    setInput("");

    // Show "Typing..." indicator
    setIsTyping(true);

    const payload = {
      message: isImage ? inputText : inputText.trim(),
      user_id: userId,
    };

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputText,
          user_id: userId,
          token: localStorage.getItem("token"),
        }),
      });

      const data = await res.json();

      // Simulate delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isTyping),
          { sender: "bot", text: data.reply },
        ]);
        setIsTyping(false);
      }, 800);
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        { sender: "bot", text: "Error connecting to the server." },
      ]);
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition)
      return alert("Speech recognition not supported in this browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      sendMessage(voiceText);
    };

    recognition.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
    };
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Send base64 image as a message
        sendMessage(reader.result, true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-xl max-w-[85%] text-sm break-words ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Uploaded"
                  className="rounded-lg mt-1 max-w-xs"
                />
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="p-2 rounded-xl bg-gray-300 text-sm text-gray-800">
              ...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-2 py-2">
        <div className="flex items-center gap-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            className="flex-grow p-2 border rounded-l-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={() => sendMessage(input)}
            className="bg-blue-500 text-white px-3 py-2 rounded-r-full hover:bg-blue-600 text-sm"
          >
            Send
          </button>
          <button
            onClick={handleVoiceInput}
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 text-sm"
            title="Voice Input"
          >
            🎤
          </button>
          <label
            htmlFor="chatbot-image-upload"
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 cursor-pointer text-sm"
            title="Upload Image"
          >
            📷
          </label>
          <input
            id="chatbot-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatBot;

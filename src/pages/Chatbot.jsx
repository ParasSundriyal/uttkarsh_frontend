import { useEffect, useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help with your student grievance today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const userId = "student123"; // Example static ID

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChatLogs = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/chatlogs", {
          method: "GET", // optional for GET, but included for clarity
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // Transform log into chat messages
        const formattedMessages = data.flatMap((log) => [
          { sender: "user", text: log.message },
          { sender: "bot", text: log.reply },
        ]);

        setMessages(
          formattedMessages.length > 0
            ? formattedMessages
            : [
                {
                  sender: "bot",
                  text: "Hello! How can I help with your student grievance today?",
                },
              ]
        );
      } catch (err) {
        console.error("Error fetching chat logs:", err);
        setMessages([
          {
            sender: "bot",
            text: "Hello! How can I help with your student grievance today?",
          },
        ]);
      }
    };

    fetchChatLogs();
  }, []);

  const handleClearChat = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/chatlogs/reset", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      alert(result.message || "Chat history cleared.");

      setMessages([
        {
          sender: "bot",
          text: "Hello! How can I help with your student grievance today?",
        },
      ]);
    } catch (err) {
      console.error("Error clearing chat:", err);
      alert("Failed to clear chat.");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadPreset = "uttkarsh";
      const cloudName = "dwlezv6pr";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      // Upload image to Cloudinary
      try {
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();

        if (cloudinaryResponse.ok) {
          // Get the image URL from Cloudinary's response
          const imageUrl = cloudinaryData.secure_url;
          console.log("Image URL: " + imageUrl);
          sendMessage(imageUrl, true);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "❌ Image upload failed. Please try again.",
            },
          ]);
        }
      } catch (error) {
        console.error("Image upload error:", error);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "❌ Error uploading image. Please try again.",
          },
        ]);
      }
    }
  };

  const sendMessage = async (inputText, isImage = false) => {
    if (!inputText) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: isImage ? null : inputText,
        image: isImage ? inputText : null,
      },
    ]);
    setInput("");
    setIsTyping(true);

    const token = localStorage.getItem("token");
    let res;

    try {
      res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputText.trim(),
          user_id: userId,
          token,
        }),
      });

      const data = await res.json();
      const botReply = data.reply;
      console.log("Bot reply:", botReply);

      // Wait briefly before showing bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isTyping),
          { sender: "bot", text: botReply },
        ]);
        setIsTyping(false);
      }, 800);

      // 🔁 Log user message and bot reply
      await fetch("http://localhost:8080/api/chatlogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          message: inputText.trim(),
          reply: botReply,
        }),
      });
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        { sender: "bot", text: "❌ Error connecting to the server." },
      ]);
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

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

  return (
    <div className="flex flex-col h-full">
      <button
        onClick={handleClearChat}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm mt-2"
      >
        Clear Chat
      </button>

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

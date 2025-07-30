// Main chat component with voice input, message history, and AI response handling.

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaMicrophone } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import RecordingIndicator from "./components/RecordingIndicator";
import AiThinkingDots from "./components/AiThinkingDots";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const recognitionRef = useRef(null);

  // Simulate mic volume changes during recording
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        const fakeVolume = Math.random() * 0.3 + 0.1;
        setVolume(fakeVolume);
      }, 300);
    } else {
      setVolume(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setAiThinking(true);

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowWelcome(false);

    try {
      const res = await axios.post("http://localhost:3001/chat", {
        message: input,
      });

      const aiReply = res.data.reply;
      const aiMessage = { role: "assistant", content: aiReply };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error contacting AI." },
      ]);
    } finally {
      setLoading(false);
      setAiThinking(false);
    }
  };

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech Recognition API is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = "ru-RU";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsRecording(true);
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + " " + transcript);
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
  };

  return (
    <div className="min-h-screen bg-[#032052] text-white flex flex-col justify-between items-center px-6 py-12 transition-all duration-700">
      {showWelcome && (
        <div className="flex-1 flex flex-col justify-center items-center text-center transition-opacity duration-700">
          <div className="relative w-10 h-10 mb-4 flex items-center justify-center">
            <RecordingIndicator isRecording={true} volume={0.2} />
            <IoChatboxEllipses className="text-white text-2xl z-10" />
          </div>
          <h3 className="flex items-center text-2xl font-semibold mb-2">Hi there!</h3>
          <h1 className="text-3xl font-bold mb-4">What would you like to know?</h1>
          <p className="text-gray-300 text-sm">
            Use one of the most common prompts below <br />
            or ask your own question
          </p>
        </div>
      )}

      <div className="w-full max-w-xl space-y-4 mt-6 transition-all flex flex-col">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-800 text-white self-end"
                : "bg-gray-700 text-white self-start"
            }`}
          >
            <p className="whitespace-pre-line">{msg.content}</p>
          </div>
        ))}

        {aiThinking && (
          <div className="self-start px-4 py-2">
            <AiThinkingDots />
          </div>
        )}
      </div>

      <div className="w-full max-w-xl flex flex-col gap-2 mt-6">
        <div className="flex items-center bg-white/10 rounded-lg backdrop-blur-md px-4 py-2">
          <div className="relative w-10 h-10 flex items-center justify-center mr-2">
            <RecordingIndicator isRecording={isRecording} volume={volume} />
            <button
              onClick={handleMicClick}
              className="text-blue-400 hover:text-white text-xl relative z-10"
            >
              <FaMicrophone />
            </button>
          </div>
          <input
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-300"
            placeholder="Ask whatever you want"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-2 text-white bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded transition"
            disabled={loading}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

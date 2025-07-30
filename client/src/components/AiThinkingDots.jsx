// Simple animated 3-dot loading indicator to show that the AI is processing a response.
export default function AiThinkingDots() {
  return (
    <div className="flex space-x-2 ml-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i} className="w-2.5 h-2.5 rounded-full bg-white animate-bounce"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

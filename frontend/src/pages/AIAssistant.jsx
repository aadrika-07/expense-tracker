import { useState } from "react";
import Layout from "../components/Layout";

function AIAssistant() {
  const [isTyping, setIsTyping] = useState(false);

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const getAIResponse = (text) => {
    const query =
      text.toLowerCase();
    if (
      query.includes("save")
    ) {
      return "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.";
    }

    if (
      query.includes("budget")
    ) {
      return "A good budget starts by tracking all expenses and setting monthly spending limits.";
    }

    if (
      query.includes("food")
    ) {
      return "Reducing restaurant spending and meal planning can significantly lower food expenses.";
    }

    if (
      query.includes("invest")
    ) {
      return "Consider learning about SIPs, index funds, and long-term investing.";
    }

    return "Track your spending regularly and review your budget every month.";
  };

  const handleSend = () => {

    if (!question.trim()) return;
  
    const userMessage = {
      sender: "user",
      text: question,
    };
  
    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);
  
    setQuestion("");
  
    setIsTyping(true);
  
    setTimeout(() => {
  
      const botMessage = {
        sender: "bot",
        text: getAIResponse(
          userMessage.text
        ),
      };
  
      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);
  
      setIsTyping(false);
  
    }, 1500);
  
  };

  return (
    <Layout>

      <h1 className="text-3xl font-bold dark:text-white mb-6">
        🤖 AI Finance Assistant
      </h1>

      <p className="text-gray-500">
        Get instant finance advice and spending guidance
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">

        <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4">

          {messages.map(
            (message, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  message.sender === "user"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            )
          )}

            {isTyping && (
            <div className="text-left mb-3">
                <span className="inline-block px-4 py-2 rounded-lg bg-gray-300 text-black">
                AI is typing...
                </span>
            </div>
            )}

        </div>

        <div className="flex gap-3">

          <input
            type="text"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Ask a finance question..."
            className="flex-1 border p-3 rounded-lg"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-5 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>

    </Layout>
  );
}

export default AIAssistant;
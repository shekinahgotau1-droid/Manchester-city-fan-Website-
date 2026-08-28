function sendAIMessage() {
  const input = document.getElementById("aiInput");
  const chat = document.getElementById("aiChat");

  if (!input || !chat) {
    alert("AI elements not found!");
    return;
  }

  const message = input.value.trim();

  if (message === "") {
    alert("Type something first!");
    return;
  }

  // Show your message
  const userMessage = document.createElement("p");
  userMessage.textContent = "You: " + message;
  chat.appendChild(userMessage);

  input.value = "";

  // AI reply
  setTimeout(() => {
    const aiMessage = document.createElement("p");

    aiMessage.textContent =
      "🤖 City AI: " + getAIResponse(message);

    chat.appendChild(aiMessage);

    chat.scrollTop = chat.scrollHeight;
  }, 500);
}

function getAIResponse(message) {
  const text = message.toLowerCase();

  if (text.includes("hello") || text.includes("hi")) {
    return "Hello! 💙 I'm City AI!";
  }

  if (text.includes("haaland")) {
    return "Haaland is one of Manchester City's star strikers! ⚽💙";
  }

  if (text.includes("pep")) {
    return "Pep Guardiola is Manchester City's manager.";
  }

  if (text.includes("city")) {
    return "Come on City! 💙🔵";
  }

  return "I'm still learning. Ask me about Manchester City, Haaland or Pep!";
}
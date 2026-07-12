// Sample responses the assistant can pick from
const SAMPLE_RESPONSES = [
  "That's a great question! I'm a demo assistant, so I can't give real answers yet — but your message was received.",
  "Thanks for reaching out! In a full version, I'd connect to an AI model to help you with that.",
  "I hear you! This is a sample response to show how the chat interface works.",
  "Interesting! Once connected to a real AI, I'd be able to give you a detailed answer.",
  "Got it! For now, I'm just showing you how messages appear in the conversation.",
];

// Get references to the HTML elements we need
const conversation = document.getElementById("conversation");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

/**
 * Creates a message element and adds it to the conversation.
 * @param {string} text - The message text
 * @param {"user" | "assistant"} role - Who sent the message
 */
function addMessage(text, role) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message message-${role}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = role === "user" ? "👤" : "🤖";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  bubble.appendChild(paragraph);

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(bubble);
  conversation.appendChild(messageDiv);

  // Scroll to the newest message
  conversation.scrollTop = conversation.scrollHeight;
}

/**
 * Shows a temporary "typing" indicator while the assistant "thinks."
 * @returns {HTMLElement} The typing indicator element (so we can remove it later)
 */
function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "message message-assistant message-typing";
  typingDiv.id = "typing-indicator";

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = "🤖";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.innerHTML =
    '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';

  typingDiv.appendChild(avatar);
  typingDiv.appendChild(bubble);
  conversation.appendChild(typingDiv);
  conversation.scrollTop = conversation.scrollHeight;

  return typingDiv;
}

/**
 * Picks a random sample response from the list.
 * @returns {string}
 */
function getSampleResponse() {
  const index = Math.floor(Math.random() * SAMPLE_RESPONSES.length);
  return SAMPLE_RESPONSES[index];
}

/**
 * Handles sending a user message and showing a sample reply.
 * @param {string} text - The user's message
 */
function handleSendMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  // Show the user's message
  addMessage(trimmed, "user");

  // Clear the input field
  messageInput.value = "";

  // Show typing indicator, then reply after a short delay
  showTypingIndicator();

  setTimeout(() => {
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();

    addMessage(getSampleResponse(), "assistant");
  }, 1000);
}

// Listen for form submission (Enter key or Send button)
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSendMessage(messageInput.value);
});

// Chatbot responses based on onboarding topics
const responses = {
    "hello": "Hello! How can I assist you with your onboarding today?",
    "welcome": "Welcome to our company! I'm here to help with any questions about the onboarding process.",
    "steps": "The onboarding steps include: 1. HR paperwork, 2. Workstation setup, 3. Orientation, 4. Training, 5. Team meetings.",
    "policies": "Key policies cover code of conduct, IT security, work-life balance, and benefits. Check the resources section for details.",
    "resources": "Resources include the Employee Handbook, Training Modules, Company Directory, and FAQ.",
    "training": "Training covers company policies, tools, and procedures. You'll have sessions scheduled soon.",
    "team": "You'll meet your team and manager during the onboarding process. Introductions will be made.",
    "default": "I'm sorry, I don't have information on that. Please check the onboarding portal or contact HR."
};

// Function to get response based on user input
function getResponse(input) {
    input = input.toLowerCase();
    for (let key in responses) {
        if (input.includes(key)) {
            return responses[key];
        }
    }
    return responses["default"];
}

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.getElementById('chatbot-toggle');
    const messages = document.getElementById('chatbot-messages');
    const input = document.getElementById('chatbot-input');
    const send = document.getElementById('chatbot-send');

    // Toggle chatbot visibility
    toggle.addEventListener('click', function() {
        if (chatbot.style.display === 'none' || chatbot.style.display === '') {
            chatbot.style.display = 'flex';
            toggle.style.display = 'none';
        }
    });

    // Close chatbot
    document.getElementById('chatbot-close').addEventListener('click', function() {
        chatbot.style.display = 'none';
        toggle.style.display = 'flex';
    });

    // Send message
    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = input.value.trim();
        if (userMessage) {
            // Add user message
            addMessage('You: ' + userMessage, 'user');
            // Get and add bot response
            const botResponse = getResponse(userMessage);
            addMessage('Bot: ' + botResponse, 'bot');
            input.value = '';
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = text;
        messageDiv.className = sender;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // Initial greeting
    addMessage('Bot: Hello! Ask me anything about employee onboarding.', 'bot');
});

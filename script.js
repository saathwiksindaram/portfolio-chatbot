function toggleChat() {
    const chatWindow = document.getElementById("chatWindow");

    if (chatWindow.style.display === "block") {
        chatWindow.style.display = "none";
    } else {
        chatWindow.style.display = "block";
    }
}

function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user");
    input.value = "";

    try {
        const response = await fetch("http://localhost:8120/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        addMessage(data.reply, "bot");

    } catch (error) {
        addMessage("Sorry, I couldn't connect to the server.", "bot");
    }
}

function addMessage(message, sender) {
    const chatMessages = document.getElementById("chatMessages");

    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "user" ? "user-message" : "bot-message";
    messageDiv.textContent = message;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
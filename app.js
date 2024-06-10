const socket = io();

const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

//adding a message to the chat box
function addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span>${message.sender}</span>: <p>${message.text}</p>`;
    chatBox.appendChild(messageElement);
    // Scroll to bottom of chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

//send button click EL
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        // Emit message to server
        socket.emit('message', { sender: 'Me', text: message });
        // Clear input field
        messageInput.value = '';
    }
});

// Event listener for receiving messages from server
socket.on('message', (message) => {
    addMessage(message);
});
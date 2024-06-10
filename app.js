const socket = io();

const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');


function addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span>${message.sender}</span>: <p>${message.text}</p>`;
    chatBox.appendChild(messageElement);
   
    chatBox.scrollTop = chatBox.scrollHeight;
}


sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        
        socket.emit('message', { sender: 'Me', text: message });
        
        messageInput.value = '';
    }
});


socket.on('message', (message) => {
    addMessage(message);
});
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    const username = prompt('Enter your username:');
    const room = prompt('Enter the room name:');
  
    socket.emit('join', { username, room });
  
    socket.on('message', (data) => {
      const messages = document.getElementById('messages');
      const messageElement = document.createElement('div');
      messageElement.innerHTML = `<strong>${data.username}</strong>: ${data.text}`;
      messages.appendChild(messageElement);
      messages.scrollTop = messages.scrollHeight;
    });
  
    window.sendMessage = () => {
      const messageInput = document.getElementById('message-input');
      const text = messageInput.value.trim();
  
      if (text !== '') {
        socket.emit('message', { username, room, text });
        messageInput.value = '';
      }
    };
  });
  
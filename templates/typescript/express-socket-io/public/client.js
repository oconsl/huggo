const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    // Display sent message immediately for the sender
    const item = document.createElement('li');
    item.textContent = 'Me: ' + input.value;
    item.style.fontWeight = 'bold';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    input.value = '';
  }
});

socket.on('chat message', function(data) {
  const item = document.createElement('li');
  item.textContent = data.id.substring(0,5) + ': ' + data.message;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('connect', () => {
  const item = document.createElement('li');
  item.textContent = 'Connected to server!';
  item.style.color = 'green';
  messages.appendChild(item);
});

socket.on('disconnect', () => {
  const item = document.createElement('li');
  item.textContent = 'Disconnected from server.';
  item.style.color = 'red';
  messages.appendChild(item);
});

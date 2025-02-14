/** @typedef {import('pear-interface')} */ /* global Pear */
document.querySelector('h1').addEventListener('click', (e) => { e.target.innerHTML = '🍐' });

const pear = new Pear();
const createChatRoomButton = document.getElementById('create-chat-room');
const joinForm = document.getElementById('join-form');
const joinChatRoomButton = document.getElementById('join-chat-room');
const joinChatRoomTopicInput = document.getElementById('join-chat-room-topic');
const loadingDiv = document.getElementById('loading');
const chatDiv = document.getElementById('chat');
const chatRoomTopicSpan = document.getElementById('chat-room-topic');
const peersCountSpan = document.getElementById('peers-count');
const messagesDiv = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message');

let topic = null;
let peers = new Set();

function showLoading() {
    loadingDiv.classList.remove('hidden');
    chatDiv.classList.add('hidden');
}

function showChat() {
    loadingDiv.classList.add('hidden');
    chatDiv.classList.remove('hidden');
}

function updatePeersCount() {
    peersCountSpan.textContent = peers.size;
}

function addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
}

createChatRoomButton.addEventListener('click', () => {
    topic = crypto.randomBytes(32).toString('hex');
    chatRoomTopicSpan.textContent = topic;
    showLoading();
    pear.join(topic);
});

joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    topic = joinChatRoomTopicInput.value;
    chatRoomTopicSpan.textContent = topic;
    showLoading();
    pear.join(topic);
});

pear.on('connection', (peer) => {
    peers.add(peer);
    updatePeersCount();

    peer.on('data', (data) => {
        const message = data.toString();
        addMessage(message);
    });

    peer.on('close', () => {
        peers.delete(peer);
        updatePeersCount();
    });
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    addMessage(`You: ${message}`);
    peers.forEach(peer => peer.send(message));
    messageInput.value = '';
});

pear.on('ready', () => {
    showChat();
});
const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//get username and room from URL
const { username } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(username);

//message from the server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //get message text
    msg = event.target.elements.msg.value;
    console.log(msg);

    //Emit message to the server
    socket.emit('chatMessage', msg)

    //clear the input
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
})

//output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
let auth = localStorage.getItem("auth");

const xanoClient = new XanoClient({
  instanceBaseUrl: "https://x8ki-letl-twmt.n7.xano.io/",
  realtimeConnectionHash: "9Xy9Tb4aWRCeJNyVSeK8QFBGn60",
});

if (auth === 1) {
  const setAuth = localStorage.getItem("authToken");
  xano.setRealtimeAuthToken(authToken);
}

function generateRandomUsername() {
  const adjectives = ['Awesome', 'Bold', 'Crazy', 'Daring', 'Energetic', 'Stealthy', 'Quick', 'Fierce'];
  const nouns = ['Lion', 'Tiger', 'Bear', 'Wolf', 'Dragon', 'Fox', 'Serpent', 'Elephant'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
}

var username

if (auth == 1) {
  fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Use the stored JWT
      }
  })
    .then((response) => response.json())
    .then((data) => {
      username = data.name
      // Set the innerHTML of the created HTML elements
      //document.getElementById('username-display').innerHTML = data.name;
      //document.getElementById('password-display').innerHTML = data.email;
      //document.getElementById('timestamp').innerHTML = data.created_at; //'Account created at: ' + data.created_at;
    })
    .catch((error) => {
      console.error(error);
    });
}
else {
  username = generateRandomUsername();
}

const mainChannel = xanoClient.channel("main");

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messageList');

// on join channel
//mainChannel.message(username + 'has joined the chatroom!');

mainChannel.on((message) => {
  switch (message.action) {
    case 'message':
      displayMessage(message.payload);
      break;
    case 'join':
      displayJoinMessage();
      break;
    case 'leave':
      displayLeaveMessage();
      break;
    default:
      console.info(message);
  }
});

function displayJoinMessage() {
  console.log('Displaying Join');
  const messageHTML = `<p>Someone joined the chatroom</p>`;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  messageList.scrollTop = messageList.scrollHeight;
}

function displayLeaveMessage() {
  console.log('Displaying Leave');
  const messageHTML = `<p>Someone left the chatroom</p>`;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  messageList.scrollTop = messageList.scrollHeight;
}

function displayMessage(message) {
  console.log('Displaying message:', message);
  const messageHTML = `
    <!--<p style="font-size: small; color: #e6e6e6;">${username}</p>-->
    <p>${message}</p>
  `;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  // Scroll to the bottom
  messageList.scrollTop = messageList.scrollHeight;
}

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  mainChannel.message(username + ': ' + message);
  messageInput.value = ''; // Clear input field
});


// Check if signed in via Xano

function updateAuthStatus() {
  auth = localStorage.getItem("auth");
  if (auth === '1') {
    document.getElementById("auth0").style.display = "none";
    document.getElementById("auth1").style.display = "block";
  } else {
    document.getElementById("auth0").style.display = "block";
    document.getElementById("auth1").style.display = "none";
  }
}

// Call updateAuthStatus() when the page loads
updateAuthStatus();





// private chat

function generatePrivateChatId() {
  n1 = math.random(1,9);
  n2 = math.random(1,9);
  n3 = math.random(1,9);
  n4 = math.random(1,9);
  n5 = math.random(1,9);
  n6 = math.random(1,9);
  n7 = math.random(1,9);
  n8 = math.random(1,9);
  n9 = math.random(1,9);
  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}`
}

const privateChatId = generatePrivateChatId();
const privateChannel = createPrivateChatChannel(privateChatId);

// Display the chat ID on the page
document.getElementById('chat-id').innerHTML = privateChatId;

// Create a modal for joining a private chat
const joinModal = $.modal({
  escapeClose: false,
  clickClose: false,
  showClose: false
});

// Add an input field for the chat ID
const chatIdInput = $('<input type="text" id="chat-id-input" placeholder="Enter chat ID">');

// Add a button to join the chat
const joinButton = $('<button id="join-button">Join Chat</button>');

// Add the input field and button to the modal
joinModal.find('.modal-body').append(chatIdInput, joinButton);

// Handle the join button click event
joinButton.on('click', () => {
  const inputChatId = chatIdInput.val();
  if (inputChatId === privateChatId) {
    joinPrivateChat(privateChatId);
    joinModal.modal('hide');
  } else {
    alert('Invalid chat ID');
  }
});

// priv chat msg

const privateChatButton = document.getElementById('private-send-button');
  privateChatButton.addEventListener('click', () => {
    const message = messageInput.value;
    privateChannel.message(username + ': ' + message);
    messageInput.value = '';
    joinPrivateChat(privateChatId);
  });

  privateChannel.on('message', (message) => {
    displayMessage(message);
  });

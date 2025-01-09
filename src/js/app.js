import { Chatroom } from "./chat.js";
import {Lielements} from "./lielement.js";
import "@fortawesome/fontawesome-free/css/all.min.css"; 


// DOM Elements
const chatrooms = document.querySelector(".chatrooms");
const chatul = document.querySelector(".chat-ul");
const chatform = document.querySelector(".chat-form"); 
const userform = document.querySelector(".user-form");
const msg = document.querySelector(".msg");
const roomtitle = document.querySelector(".roomtitle");

// Get username from localStorage or default to "Guest"
const getlocalname = localStorage.username ? localStorage.username : "Guest";
userform.username.placeholder = `Username is ${getlocalname}`;

// Lielements
const domli = Lielements(chatul);

// Chatroom instance
const chatroom = Chatroom("general", getlocalname);
roomtitle.textContent = "General";

// Start chat
chatform.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chatform.message.value.trim();

    chatroom.addChat(message)
      .then(() => chatform.reset())
      .catch((err) => console.log(err));

});

// Update username
userform.addEventListener("submit", (e) => {
  e.preventDefault();

  const newusername = userform.username.value.trim();

    chatroom.updateUsername(newusername);
    userform.reset();

    // Show & hide msg
    msg.innerText = `New name updated to ${newusername}`;
    userform.username.placeholder = `Username is ${newusername}`;

    setTimeout(() => msg.innerText = "", 3000); // Fixed logic

});

// Update chat room
chatrooms.addEventListener("click", (e) => {
  e.preventDefault();

  const getbtn = e.target.closest('button');
  // console.log(getbtn);

  if(getbtn){

    //reset li , clear all previous li
    domli.resetli();

    const getroomid = getbtn.getAttribute('id');
    // console.log(getroomid);
    const gettitle = getbtn.querySelector('h3').innerText;

    //update room title dynamically 
    roomtitle.textContent = gettitle;

    chatroom.updateChatroom(getroomid);

    //fetch get chats 
    chatroom.getChats((data)=>{

    domli.newli(data);
     });

  }

  

});


// Get Chats
chatroom.getChats((data)=>{
  // return data;

  domli.newli(data);
})
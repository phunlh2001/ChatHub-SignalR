"use strict";

const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

const btnSend = document.getElementById("sendButton");

btnSend.disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    const li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);

    li.textContent = `${user} says ${message}`;
});

connection.start()
    .then(() => btnSend.disabled = false)
    .catch(err => console.log(err.toString()));

btnSend.addEventListener("click", (event) => {
    let user = document.getElementById("userInput").value;
    let message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, message)
        .catch(err => console.error(err.toString()));

    event.preventDefault();
})
$(() => {
    const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    const btnSend = $("#sendButton");

    btnSend.disabled = true;

    connection.on("ReceiveMessage", (user, message) => {
        const li = document.createElement("li");
        $("#messagesList").append(li);

        li.textContent = `${user} says ${message}`;
    });

    connection.start()
        .then(() => btnSend.disabled = false)
        .catch(err => console.log(err.toString()));

    btnSend.on("click", (e) => {
        let user = $("#userInput").val();
        let message = $("#messageInput").val();

        connection.invoke("SendMessage", user, message)
            .catch(err => console.error(err.toString()));

        e.preventDefault();
    })
})
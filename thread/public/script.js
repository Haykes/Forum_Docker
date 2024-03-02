document.addEventListener("DOMContentLoaded", function () {
    const messageList = document.getElementById("messageList");
    const messageListContainer = document.getElementById("messageListContainer");

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', options);
    }

    function loadMessages() {
        fetch('/messages')
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    console.error('Réponse reçue n\'est pas un tableau:', data);
                    return;
                }

                messageList.innerHTML = '';
                data.forEach(message => {
                    const messageItem = document.createElement("li");
                    const formattedDate = formatDate(message.timestamp);
                    messageItem.textContent = `${message.pseudo} - ${formattedDate} : ${message.content}`;
                    messageList.appendChild(messageItem);
                });
            })
            .catch(error => console.error('Erreur lors du chargement des messages:', error));
    }

    loadMessages();
});

const express = require('express');
const app = express();
const mysql = require('mysql');

// Configuration de la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connexion à la base de données
db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

// Middleware pour parser le JSON
app.use(express.json());

// Configuration pour servir des fichiers statiques depuis le répertoire "public"
app.use(express.static('public'));

// Route pour afficher les messages
app.get('/messages', (req, res) => {
    db.query('SELECT pseudo, content, timestamp FROM messages', (err, rows) => {
        if (err) {
            console.error('Erreur lors de la récupération des messages:', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
        }
        res.json(rows);
    });
});

// Route pour servir le fichier index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


// Route pour poster un message
app.post('/messages', (req, res) => {
    const { pseudo, content } = req.body;
    if (!pseudo || !content) {
        return res.status(400).json({ error: 'Le pseudo et le contenu du message sont requis' });
    }
    const newMessage = { pseudo, content};

    db.query('INSERT INTO messages SET ?', newMessage, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion du message:', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion du message' });
        }
        res.status(201).json(newMessage);
    });
});

// Démarrage du serveur sur le port 8080
const port = 8080;
app.listen(port, () => {
    console.log(`Serveur Sender démarré sur http://localhost:${port}`);
});

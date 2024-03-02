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

// Middleware pour parser le JSON et servir des fichiers statiques
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

// Démarrage du serveur sur le port 80
const port = 80;
app.listen(port, () => {
    console.log(`Serveur Thread démarré sur http://localhost:${port}`);
});

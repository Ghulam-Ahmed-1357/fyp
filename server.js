const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose')
const alertRoutes = require('./routes/alerts');
const { handleAlert } = require('./controllers/alertController');


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // frontend
        methods: ['GET', 'POST']
    }
});

// Store io in app locals so controllers can access
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());
app.use(express.json());

// MongoDB connection (optional for storing alerts)
mongoose.connect('mongodb://localhost:27017/snatchingDB');

app.use('/api/alerts', alertRoutes);

app.get("/", (req, res) => {
    res.send("Hello")
})


server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const alertRoutes = require('./routes/alerts'); // make sure this doesn't use MongoDB
const { handleAlert } = require('./controllers/alertController');

const app = express();
const server = http.createServer(app);

// Get port from Railway-provided env variable
const PORT = process.env.PORT || 5000;

// Setup Socket.IO with CORS
const io = new Server(server, {
    cors: {
        origin: 'https://snatching-frontend.vercel.app', // ✅ no trailing slash
        methods: ['GET', 'POST']
    }
});

// Make io accessible in requests
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());
app.use(express.json());

// Routes (must be self-contained, no DB calls)
app.use('/api/alerts', alertRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Hello from Railway backend!");
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

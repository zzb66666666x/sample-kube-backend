const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",  // Allow all origins for Socket.IO
        methods: ["GET", "POST"],
    }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sayHello', () => {
    socket.emit('reply', 'Hello World');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// also add a simple get method and return a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

const PORT = process.env.PORT || 8228;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.static('public'));

// Quiz results storage
// let results = [0, 0, 0];

// io.on('connection', (socket) => {
//     socket.emit('resultsUpdate', results);

//     socket.on('quizAnswer', ({ qIndex, aIndex }) => {
//         results[aIndex]++;
//         io.emit('resultsUpdate', results);
//     });

//     socket.on('resetQuiz', () => {
//         results = [0, 0, 0];
//         io.emit('resultsUpdate', results);
//     });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });





const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// Initialize results for 3 questions (each with 3 answer options)
let results = Array(3).fill().map(() => [0, 0, 0]); // 3 questions × 3 answers

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    // Send current results to new clients
    socket.emit('resultsUpdate', results);
    
    // Handle answer submissions
    socket.on('quizAnswer', ({ qIndex, aIndex }) => {
        try {
            if (qIndex >= 0 && qIndex < results.length && 
                aIndex >= 0 && aIndex < results[qIndex].length) {
                results[qIndex][aIndex]++;
                io.emit('resultsUpdate', results);
            }
        } catch (error) {
            console.error('Invalid answer received:', error);
        }
    });
    
    // Handle quiz reset
    socket.on('resetQuiz', () => {
        results = Array(3).fill().map(() => [0, 0, 0]);
        io.emit('resultsUpdate', results);
    });
    
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

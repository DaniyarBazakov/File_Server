const net = require('net');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = 'localhost'; 

const server = net.createServer((socket) => {
    console.log('Client connected.');

    socket.on('data', (data) => {
        const filename = data.toString('utf8').trim();
        console.log(`Client requested file: ${filename}`);

        const filepath = path.join(__dirname, 'data', filename);

        fs.readFile(filepath, (err, fileData) => {
            if (err) {
                console.error(`Error reading file ${filename}: ${err.message}`);
                socket.write('ERROR: File not found');
                return;
            }

            socket.write(fileData);
        });
    });

    socket.on('end', () => {
        console.log('Client disconnected.');
    });

    socket.on('error', (err) => {
        console.error(`Socket error: ${err.message}`);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});

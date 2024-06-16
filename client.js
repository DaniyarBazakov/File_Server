const net = require('net');

const PORT = 8080;
const HOST = 'localhost';  

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('Connected to server.');

    const filename = 'index.html'; 

    client.write(filename);

    client.on('data', (data) => {
        console.log('Received from server:', data.toString('utf8'));
        client.destroy();
    });

    client.on('error', (err) => {
        console.error(`Client error: ${err.message}`);
        client.destroy();
    });

    client.on('close', () => {
        console.log('Connection closed.');
    });
});

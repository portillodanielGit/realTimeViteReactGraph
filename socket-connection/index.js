import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import {fileURLToPath} from 'url';
import path from 'path';
import cors from 'cors';
import os from 'os-utils';

const app = express();
app.use(cors());
const server = createServer(app);

export const io = new Server(server, {
	cors: {
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST'],
		credentials: true,
		optionSuccessStatus: 200,
	},
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

let allClients = [];
io.on('connection', (socket) => {
	console.log(`User Connected: ${socket.id}`);

	const interval = setInterval(function () {
		os.cpuUsage((cpuPercent) => {
			io.emit('msg', {
				name: 'cpu',
				value: cpuPercent,
			});
		});
	}, 10000);

	socket.on('send_msg', (data) => {
		io.emit('msg', `${data}`);
	});

	socket.on('disconnect', function () {
		console.log('Got disconnect!');
		clearInterval(interval);
	});
});

server.listen(3001, () => {
	console.log('server running at http://localhost:3001');
});

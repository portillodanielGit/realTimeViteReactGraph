import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import {fileURLToPath} from 'url';
import path from 'path';
import cors from 'cors';
import os from 'os-utils';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs} from './typeDefs.js';
import {resolvers} from './resolvers.js';
import {connectDB} from './db.js';
import axios from 'axios';

const app = express();
connectDB();

const bar1 = [
	{name: 'bar1', value: 1},
	{name: 'bar2', value: 2},
];
app.use(cors(), function (request, response, next) {
	request.io = io;
	next();
});
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

app.get('/', async (req, res) => {
	const queryResult = await axios.post('http://localhost:3001/graphql', {
		query: `query  {
                getAllTasks {
                    description,
                    id,
                    title
                    }
                    }`,
		headers: {'Content-Type': 'application/json'},
	});
	console.log(queryResult.data.data.getAllTasks);
	req.io.emit('test', queryResult.data.data.getAllTasks);
	// send api data, route, info , etc to web client, axios, etc
	res.send('welcome to my api');
});

app.get('/bar1', async (req, res) => {
	const index = bar1.findIndex((v) => v.name === 'bar1');
	bar1[index].value = bar1[index].value + 1;
	req.io.emit('barStats', bar1);
	// send api data, route, info , etc to web client, axios, etc
	res.send('Bar 1 change');
});
app.get('/bar2', async (req, res) => {
	const index = bar1.findIndex((v) => v.name === 'bar2');
	bar1[index].value = bar1[index].value + 1;
	req.io.emit('barStats', bar1);
	// send api data, route, info , etc to web client, axios, etc
	res.send('Bar 2 change');
});

io.on('connection', (socket) => {
	console.log(`User Connected: ${socket.id}`);
	console.log(bar1);
	io.emit('barStats', bar1);
	let timer = 0;
	const interval = setInterval(function () {
		timer = timer + 10;
		io.emit('msg', {
			name: timer + ' s',
			value: Math.random() * (50 - 0) + 0,
			value2: Math.random() * (50 - 0) + 0,
		});
		/* os.cpuUsage((cpuPercent) => {
			io.emit('msg', {
				name: timer + ' s',
				value: cpuPercent * 100,
			});
		}); */
	}, 10000);

	socket.on('send_msg', (data) => {
		io.emit('msg', `${data}`);
	});

	socket.on('disconnect', function () {
		console.log('Got disconnect!');
		clearInterval(interval);
	});
});

const start = async () => {
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
	});

	await apolloServer.start();
	apolloServer.applyMiddleware({app: app});

	server.listen(3001, () => {
		console.log('server running at http://localhost:3001');
	});
};

start();

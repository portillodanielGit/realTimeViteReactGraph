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

io.on('connection', (socket) => {
	console.log(`User Connected: ${socket.id}`);

	/* const interval = setInterval(function () {
		os.cpuUsage((cpuPercent) => {
			io.emit('msg', {
				name: 'cpu',
				value: cpuPercent,
			});
		});
	}, 10000);

	socket.on('send_msg', (data) => {
		io.emit('msg', `${data}`);
	}); */

	socket.on('disconnect', function () {
		console.log('Got disconnect!');
		//clearInterval(interval);
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

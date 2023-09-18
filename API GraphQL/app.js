import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs} from './typeDefs.js';
import {resolvers} from './resolvers.js';
import {connectDB} from './db.js';
import axios from 'axios';

const app = express();
connectDB();

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

	console.log(queryResult.data.data);
	res.send('welcome to my api');
});

export default app;

const start = async () => {
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
	});

	await apolloServer.start();
	apolloServer.applyMiddleware({app: app});

	app.listen(3001, () => {
		console.log(`listening on ${3001}`);
	});
};
start();

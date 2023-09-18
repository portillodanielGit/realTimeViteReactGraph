import { useState, useEffect } from 'react';
import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function Demo() {
	/* const [socket, setSocket] = useState(); */
	const [messageReceived, setMessageReceived] = useState([]);
	const [stats, setStats] = useState([]);
	const sendMessage = () => {
		console.log('asd');
		socket.emit('send_msg', Math.random());
	};

	useEffect(() => {
		socket.on('msg', (data) => {
			/* console.log(data); */
			setStats((currentData) => [...currentData, data]);
		});

		socket.on('test', (data) => {
			setMessageReceived(data);
			console.log(messageReceived);
		});
	}, []);

	return (
		<>
			<LineChart width={500} height={300} data={stats}>
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line dataKey='value' stroke='#8884d8' />
			</LineChart>

			<button onClick={sendMessage}>asd</button>
			<div>
				{messageReceived.length == 0
					? 'nada'
					: messageReceived.map(({ id, description, title }) => {
							return (
								<div key={id}>
									<div>Id:{id}</div>
									<div>Description:{description}</div>
									<div>Title:{title}</div>
									<h1></h1>
								</div>
							);
					  })}
			</div>
			<div></div>
		</>
	);
}

export default Demo;

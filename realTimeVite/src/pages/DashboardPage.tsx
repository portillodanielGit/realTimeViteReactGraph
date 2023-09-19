import { useState, useEffect } from 'react';
import AreaC from '@/components/charts/AreaC';
import BarC from '@/components/charts/BarC';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');
const DashboardPage = () => {
	/* const [socket, setSocket] = useState(); */
	const [messageReceived, setMessageReceived] = useState([]);
	const [stats, setStats] = useState([]);
	const [barStats, setBarStats] = useState([]);

	useEffect(() => {
		socket.on('msg', (data) => {
			setStats((currentData) => [...currentData, data]);
			console.log(stats);
		});

		socket.on('barStats', (data) => {
			console.log(data);
			setBarStats(data);
			console.log(barStats);
		});
		/* 
		socket.on('test', (data) => {
			setMessageReceived(data);
			console.log(messageReceived);
		}); */
	}, []);
	return (
		<>
			<div className='grid grid-cols-2 gap-4 h-max'>
				<div className=' '>
					<AreaC data={stats}></AreaC>
				</div>
				<div className=' '>
					<BarC data={barStats}></BarC>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;

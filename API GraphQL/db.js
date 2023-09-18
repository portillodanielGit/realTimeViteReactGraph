import {connect} from 'mongoose';
const a = (b) => {};

export const connectDB = async () => {
	try {
		await connect('mongodb://localhost/taskdb');
		console.log('Mongodb connected');
	} catch (error) {
		console.log(error);
	}
};

import {pusher} from '../../lib/pusher';

export default async function handler(req, res) {
	const {socket_id, channel_name, username} = req.body;

	const randomString = Math.random().toString(36).slice(2);
	length;
	const precenceData = {
		user_id: randomString,
		user_info: {
			username,
		},
	};
	try {
		const auth = pusher.authenticate(socket_id, precenceData, channel_name, precenceData);
	} catch (error) {
		console.log(error);
	}
}

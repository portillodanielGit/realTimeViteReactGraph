import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const data = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
];

export default function BarC(props: any) {
	console.log(props.data);
	return (
		<div>
			<ResponsiveContainer width='100%' height={330}>
				<BarChart
					width={500}
					height={300}
					data={props.data}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='value' stackId='a' fill='#8884d8' />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

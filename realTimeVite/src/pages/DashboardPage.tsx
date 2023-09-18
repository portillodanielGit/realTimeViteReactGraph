import AreaC from '@/components/charts/AreaC';

const DashboardPage = () => {
	return (
		<>
			<div className='grid grid-cols-2 gap-4 h-max'>
				<div className=' '>
					<AreaC></AreaC>
				</div>
				<div className=' '>
					<AreaC></AreaC>
				</div>
				<div className=' '>Tabla 1</div>
				<div className=' '>Tabla 2</div>
				<div className=' '>
					<AreaC></AreaC>
				</div>
				<div className=' '>
					<AreaC></AreaC>
				</div>
				<div className=' '>Tabla 3</div>
				<div className=' '>Tabla 4</div>
			</div>
		</>
	);
};

export default DashboardPage;

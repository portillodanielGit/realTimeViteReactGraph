import { LoginCard } from '@/components/LoginCard';

const LoginPage = () => {
	return (
		<div className='grid grid-cols-6 gap-4'>
			<div className='col-start-3 col-span-2'>
				<LoginCard></LoginCard>
			</div>
		</div>
	);
};

export default LoginPage;

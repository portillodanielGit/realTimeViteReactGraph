import { Button } from '@/components/ui/button';
import { DashboardContext } from '../context/DashboardContext';
import { useContext } from 'react';
import { type MemberContextType } from '@/context/types';

const Test = () => {
	const { members } = useContext(DashboardContext) as MemberContextType;
	return (
		<div className='grid grid-cols-3'>
			<div>adsdas</div>
		</div>
	);
};

export default Test;

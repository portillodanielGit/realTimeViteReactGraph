import { Link } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';
import { ModeToggle } from './mode-toggle';

/**
 * Navigation Component
 * @function Navigation
 */
export const Navigation = () => {
	return (
		<div>
			<div className='space-y-1'>
				<h4 className='text-sm font-medium leading-none'>Testing</h4>
				<p className='text-sm text-muted-foreground'>
					<ModeToggle></ModeToggle>
				</p>
			</div>
			<Separator className='my-4' />
			<div className='flex h-5 items-center space-x-4 text-sm'>
				<Link to={'/dashboard'}>Dashboard</Link>
				<Separator orientation='vertical' />
				<Link to={'/login'}>Login</Link>
				<Separator orientation='vertical' />
			</div>
			<Separator className='my-4' />
		</div>
	);
};

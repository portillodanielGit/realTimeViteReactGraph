import { useState, type ReactNode } from 'react';
import PropTypes from 'prop-types';
import { DashboardContext } from './DashboardContext';
import { type Member } from './types';
/**
 * Context Provider of the app
 * @function DashboardProvider
 */
interface Props {
	children: ReactNode;
}

export const DashboardProvider = ({ children }: Props) => {
	const [members, setMembers] = useState<Member[]>([]);

	return (
		<DashboardContext.Provider value={{ members, setMembers }}>
			{children}
		</DashboardContext.Provider>
	);
};
DashboardProvider.propTypes = {
	children: PropTypes.object,
};

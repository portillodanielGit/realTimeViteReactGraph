import { DashboardProvider } from './context/DashboardProvider';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from '@/components/theme-provider';

const queryClient = new QueryClient();

const App = () => {
	return (
		<>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<DashboardProvider>
						<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
							<Navigation></Navigation>
							<Routes>
								<Route
									path='/'
									element={<Navigate to='/login'></Navigate>}
								></Route>
								<Route path='/login' element={<LoginPage></LoginPage>}></Route>
								<Route
									path='/dashboard'
									element={<DashboardPage></DashboardPage>}
								></Route>
								<Route
									path='/dashboard/:id'
									element={<DashboardPage></DashboardPage>}
								></Route>
							</Routes>
						</ThemeProvider>
					</DashboardProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</>
	);
};

export default App;

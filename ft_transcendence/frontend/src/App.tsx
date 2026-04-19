import SignInPage from './pages/SignInPage/index';
import ChatPage from './pages/chat';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import WichGame from './pages/WichGame';
import {UsersProvider, MyProvider} from './context/Users'
import AIMoDe from './pages/AIMoDe/AIMoDe';
import ONlineMoDe from './pages/ONlineMoDe/ONlineMoDe';
import Login from './pages/Login';
import CreateGroup from './pages/chat/CreateGroup';
import EditGroup from './pages/chat/EditGroup';
import Game from './pages/Game';
import Search from './pages/Search';
import SocketContext, { SocketProvider } from './context/Socket';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Opponent from './pages/Opponent/Opponent';
import UserPage from './pages/UserPage/UserPage';
import Profile from './pages/Profile/Profile';
import Axios from './context/Axios'
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InvitePlaY from './components/Notifications/Invite_Play';
import { gameInvite } from './interfaces/Invite';

const Private = () => {
	const [user, setUser] = useState<any>(undefined);
	const socket = useContext(SocketContext)

	useEffect(() => {
		(async () => {
		try {
			const data = localStorage.getItem('user')
			if (!data) {
				setUser(null)
			} else {
				const res = await Axios('/user/profile')
				localStorage.setItem('user', JSON.stringify(res.data))
				setUser(res.data)
				socket.on('game_invite_game',(invite: gameInvite) => {
					toast(<InvitePlaY invite={invite}/>);
				})
			}
		} catch(eror) {
			setUser(null)
		}
		})();
	}, []);
	switch (user) {
		case undefined:
			return <div>Loading ..</div>
		case null:
			return <Navigate to='/' />
		default:
			return <Outlet />
	}
}

const Public = () => {
	const [user, setUser] = useState<any>(undefined);

	useEffect(() => {
		(async () => {
		try {
			const data = localStorage.getItem('user')
			if (!data) {
				setUser(null)	
			} else {
				const res = await Axios('/user/profile')
				localStorage.setItem('user', JSON.stringify(res.data))
				setUser(res.data)
			}
		} catch( error) {
			setUser(null)
		}
		})();
	}, []);
	// if (user === undefined) return <div>Loading ..</div>
	// if (user === null) return <Outlet />
	// return <Navigate to='/userpage' />
	switch (user) {
		case undefined:
			return <div>Loading ..</div>
		case null:
			return <Outlet />
		default:
			return <Navigate to='/userpage' />
	}
}

function App() {
  return (
    <BrowserRouter>
    	<MyProvider>
    		<UsersProvider>
					<SocketProvider>
    				<Routes>
							<Route element={<Private />}>
								<Route path='/chat' element={<ChatPage /> } />
								<Route path='/wichgame' element={<WichGame/>} />
								<Route path='/aimode' element={<AIMoDe/>} />
								<Route path='/onlinemode' element={<ONlineMoDe/>} />
								<Route path='/editegroup' element={<EditGroup />} />
								<Route path='/creategroup' element={<CreateGroup />} />
								<Route path='/search' element={<Search />} />
								<Route path='/setting' element={<Opponent />} />
								<Route path='/userpage' element={<UserPage />} />
								<Route path='/profile/:id' element={<Profile />} />
								<Route path='/game' element={<Game/>} />
								<Route path='*' element={<PageNotFound />} />
							</Route>
							<Route element={<Public />}>
								<Route path='/' element={<SignInPage />} />
								<Route path='/login' element={<Login/>} />
							</Route>
      			</Routes>
					</SocketProvider>
    		</UsersProvider>
    	</MyProvider>
    </BrowserRouter>
  )
}

export default App;

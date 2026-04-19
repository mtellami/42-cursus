import Axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AiMode from "../../components/Game/AiMode"
import GameTable from "../../components/Game/GameTable"
import Navbar from "../../components/navbar"
import SocketContext from "../../context/Socket"
import { LiveGame } from "../../interfaces/game"
import gold from '../../photos/gold-medal.png'
import silver from '../../photos/silver-medal.png'
import bronze from '../../photos/bronze-medal.png'

const Card = ({ user, pos }: {user: any, pos: string}) => {
	const acheivements = () => { 
		if (user && user.level < 30) return bronze
		if (user && user.level < 100) return silver
		return gold
	}
	return (
		<div className="relative">
			<div className={`w-[6rem] h-[6rem] absolute top-[-1rem] ${pos == 'right' ? 'right-[6rem]' : 'left-[7rem]'} 2xl:hidden`}><img className="w-full h-full rounded-full" src={user.avatar} /></div>
			<div className="basis-1/6 m-6 bg-gray-60 rounded-3xl h-[50rem] w-[15rem] 2xl:w-[25rem] hidden 2xl:flex flex-col justify-between items-center">
			<img className="w-[7rem] h-[7rem] 2xl:w-[12rem] 2xl:h-[12rem] rounded-full mt-8" src={user.avatar}/>
      <p className='text-3xl font-semibold capitalize my-3'>{user.name}</p>
      <p className='font text-3xl'>Level</p>
      <p className='font-semibold text-4xl'>{user.level}</p>
      <p className='mt-8 font text-3xl'>Achievements</p>
      <img className="max-w-[6rem] rounded-full mb-[5rem]" src={acheivements()} alt="photo" />
		</div>
		</div>
	)
}

const Game = () => {
  const socket = useContext(SocketContext);
	const navigate = useNavigate()
	const [liveGame, setLiveGame] = useState<LiveGame | undefined>(undefined)

	const fetchLiveGame = async () => {
		const aiGame = localStorage.getItem('liveGame')
		if (aiGame) {
			setLiveGame(JSON.parse(aiGame))
			return 
		}
		try {
			const res =  await Axios('game/live')
			setLiveGame(res.data)
		} catch (error) {
			navigate('/WichGame')
		}
	}

	useEffect(() => {
		if (!socket.connected) {
			socket.connect()
		}
		fetchLiveGame()
		return () => {
			if (liveGame?.receiver.name != 'aiBoot') {
				socket.emit('game_leave_game')
			}
		};
	}, [])

	if (liveGame === undefined) {
		return <>Loading ..</>
	}
  return (
		<div className="w-full">
			<Navbar/>
			<div className="p-6 flex justify-evenly max-w-full">
      	<Card user={liveGame?.sender} pos={'left'} />
				<div className="grow flex flex-col items-center pt-[6rem]">
					{liveGame && liveGame.receiver.name != 'aiBoot' && <GameTable/>}
					{liveGame && liveGame.receiver.name == 'aiBoot' && <AiMode/>}
				</div>
      	<Card user={liveGame?.receiver} pos={'right'}/>
			</div>
		</div>
  )
}

export default Game

import { useContext, useEffect } from "react";
import Navbar from "../../components/navbar";
import online from "../../photos/manette1.png";
import SocketContext from "../../context/Socket";
import { useNavigate } from "react-router-dom";
import './ONlineMode.css'
import { LiveGame } from "../../interfaces/game";

const ONlineMoDe = () => {
  const navigate = useNavigate()
  const socket = useContext(SocketContext)

	useEffect(() => {
		socket.emit('game_find_peer')
  	socket.on('game_join_game', (liveGame: LiveGame) => {
			localStorage.setItem('liveGame', JSON.stringify(liveGame))
  	  navigate('/game')
  	})
		return () => {
			socket.emit('game_cancel_find_peer')
		}
	}, [socket])

  return (
    <div>
      <Navbar/>
			<div className="text-center m-[3rem]">
					<h2 className="font-bold">Mannual</h2>
					<p className="italic">Use mouse to move the paddle! the first player score 5 points is the winner</p>
			</div>
    	<div className="flex justify-center place-self-center -mt-20">
      	<div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 rounded-t-3xl rounded-b-3xl m-10 h-[50rem] w-[30rem] mt-28 bg-gray-60 drop-shadow-2xl" >
          <img className="h-52 ml-[9rem] mt-9 " src={online} alt="pongo"/>
          <div className="flex justify-center text-5xl font-bold mt-10 ml-3 ">ONLNE</div>
          <div className="flex justify-center text-3xl mt-6 italic">Play vs random person</div>
          <div className="flex justify-center text-3xl italic mt-1"> to rank up</div>
          <div className="board">
            <div className="bat"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="back"></div>
          </div>
          <div className="flex justify-center mt-48 ml-5">
            <p className="text-2xl mt-6 "> <strong >Wating for a Player...</strong></p>
          </div>
      	</div>
    	</div>
    </div>
  )
}

export default ONlineMoDe;

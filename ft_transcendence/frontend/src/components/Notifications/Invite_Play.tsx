import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocketContext from "../../context/Socket";
import { gameInvite } from "../../interfaces/Invite";
import { LiveGame } from '../../interfaces/game'

const InvitePlaY = ({ invite }: { invite: gameInvite }) => {
	const navigate = useNavigate()
	const socket = useContext(SocketContext)

	useEffect(() => {
		return (() => {
			socket.emit('game_invite_game_response', {id: invite.id, accept: false})
		})
	}, [])
	
	const acceptGameInvite = () => {
		socket.emit('game_invite_game_response', {id: invite.id, accept: true})
		socket.on('game_join_game', (liveGame: LiveGame) => {
			localStorage.setItem('liveGame', JSON.stringify(liveGame))
			navigate('/game')
		})
	}
	const refuseGameInvite = () => {
		socket.emit('game_invite_game_response', {id:  invite.id, accept: false})
	}

  return (
    <> 
			<div className="flex items-center mb-5">
				<img className="w-10 rounded-full" src={invite.sender.avatar} />
				<p className="ml-3">{invite.sender.name} invite you to play</p><br/>
			</div>
      <button className="ml-2" onClick={acceptGameInvite}>accept </button>
      <button className="ml-36" onClick={refuseGameInvite}>refusse</button>
    </>
  )
}

export default InvitePlaY;

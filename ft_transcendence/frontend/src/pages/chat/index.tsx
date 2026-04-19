import { useEffect, useState } from 'react'
import ChatList from "../../components/chatList";
import { FiSend } from 'react-icons/fi'
import Navbar from '../../components/navbar';
import { useContext } from 'react';
import InfoCard from '../../components/InfoCard/InfoCardUser';
import InfoCardGroup from '../../components/InfoCard/InfoCardGroup';
import { useNavigate } from "react-router-dom";
import SocketContext from "../../context/Socket"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemInfo from '../../components/shared/cardInfoUG';
import { listofgroup } from '../../interfaces/Chat'
import Axios from '../../context/Axios';
import { BiMessageSquareAdd } from "react-icons/bi"
import { DirectMessage } from './datatypes';
import { LiveGame } from '../../interfaces/game';
import {Link } from "react-router-dom";
import { AiOutlineSetting } from 'react-icons/ai';

 	////////////////////////////////////////////////////////////////
	const ChatPage = () => {
	const [dms, setDms] = useState<DirectMessage[] | undefined>(undefined)
	const [rooms, setRooms] = useState<listofgroup[] | undefined>(undefined)

	const socket = useContext(SocketContext);
	const navigate = useNavigate()
	const [user, setUser] = useState<any>(undefined)
	const [message, setMessage] = useState('');
	const [selected, setSelected] = useState('friends')
	const [friend, setFriend] = useState<any>()
	const [group, setGroup] = useState<listofgroup>()
	////////////////////////////////////////////////////////////////

	const urlParams = new URLSearchParams(window.location.search);
	const queryDm = urlParams.get('dm');
	const queryRoom = urlParams.get('room');

	const fetchDms = async () => {
		try {
			const res = await Axios.get('dm/all')
			setDms(res.data)
			if (queryDm) {
				const find = res.data.find((obj: any) => obj.id == queryDm)
				find ? setFriend(find) : setFriend(res.data[0])
			} else {
				setFriend(res.data[0])
			}
		} catch (error) {
		}
	}

	const fetchRooms = async () => {
		try {
			const res = await Axios.get('chat/all')
			setRooms(res.data)
			if (queryRoom) {
				const find = res.data.find((obj: any) => obj?.chat.id === queryRoom)
				if (find) {
					setGroup(find)
					setSelected('channels')
				} else {
					setGroup(res.data[0])
				}
			}
			setGroup(res.data[0])
		} catch (error) {
		}
	}
	
	useEffect(() => {
		if (!socket.connected) {
			socket.connect()
		}
		(async() => {
			try {
				const res = await Axios('/user/profile')
				setUser(res.data)
			} catch (error) {
			}
		})()
	}, [])

	useEffect(() => {
		fetchDms();
		fetchRooms();
	}, [selected])
	////////////////////////////////////////////////////////////////

  const handleSubmitMessage = (e: any) => {
		e.preventDefault()
		const m = message.trim()
		if (m != '') {
			socket.emit(`${selected === 'friends' ? 'dm_message' : 'chat_message'}`, {
				chatid: selected === 'friends' ? friend?.id : group?.chat.id,
				content: m
			})
		}
		setMessage('')
  }

 	const toggleButton = (e: any) => {
		document.querySelector('#friends')?.classList.remove('bg-gray-70')
		document.querySelector('#channels')?.classList.remove('bg-gray-70')
		if (e.target.id == 'friends') {
			setSelected(e.target.id)
			navigate('/chat')
		} else {
			setSelected(e.target.id)
		}
		document.querySelector(`#${e.target.id}`)?.classList.add('bg-gray-70')
  }

  const Quitbutton = async() => {
		try {
			await Axios.post(`chat/leave?chatid=${group?.chat.id}`)
			fetchRooms()
			fetchDms()
		} catch(error) {
		}
  } 

  const invitetoplay = () => {
		socket.emit('game_invite_game', { id: friend.sender.id != user.id ? friend.sender.id : friend.receiver.id })
    toast(<div>Game invite sended</div>)
		socket.on('game_join_game', (liveGame: LiveGame) => {
			localStorage.setItem('liveGame', JSON.stringify(liveGame))
			navigate('/game')
		})
  }
	
	const goToProfile = () => {
		if (friend.sender.id != user.id) {
			navigate(`/profile/${friend.sender.id}`)
		} else {
			navigate(`/profile/${friend.receiver.id}`)
		}
	}

	////////////////////////////////////////////////////////////////
	if (dms === undefined || rooms === undefined || user == undefined) {
		return <>Loading ..</>
	}

  return (
    <div>
      <Navbar />
      <div className="app flex justify-center mt-10 space-x-10">
        {/* Left Content  */}
        <div className="sm:w-96 md:w-96 lg:w-1/5 ml-10">
          <div className="h-[65rem] w-full rounded-t-3xl rounded-b-xl m-6 bg-gray-60">
            <div className="flex items-center justify-evenly m-6 pt-6 pl-4 ">
              <button id='friends' onClick={toggleButton} className={` p-2 cursor-pointer px-6 rounded-3xl text-3xl font-bold ${selected === 'friends' ? 'bg-gray-70' : ''} `}>
								Friends
							</button>
              <button id='channels' onClick={toggleButton} className={`p-2 cursor-pointer px-6 rounded-3xl text-3xl font-bold ${selected === 'channels' ? 'bg-gray-70' : ''} `}>
								Channels
							</button>
            </div>
             <div className="border-t border-black mt-1 "/>
             <div className="flex flex-col items-center justify-btween w-full h-5/6 overflow-hidden">
              <ul className="w-full overflow-y-auto flex flex-col items-center">
              {selected === 'channels' &&
								<div className='px-5 w-full flex items-center mt-3'>
									<div onClick={() => {navigate("/creategroup")}}
											className='transition-all w-[4rem] mt-2 cursor-pointer text-gray-70 hover:text-white-6 text-6xl'>
										<BiMessageSquareAdd />
									</div>
									<h6 className='ml-4 text-2xl italic font-bold'>Create group</h6>
								</div>
							}
							<ul className='w-full mt-5 px-2'>
              	{selected === 'channels' && rooms?.map(grp => (
									<ItemInfo key={grp.chat.id}
										item={grp} handleClick={() => {setGroup(grp)}}
										id={grp.chat.id} name={grp.chat.name}
										isOnline={false}
										image={grp.chat.avatar} />
              	))}
              	{selected === 'friends' && dms?.map(dm => (
									<ItemInfo key={dm.id}
										item={dm} handleClick={() => {setFriend(dm)}}
										id={dm.sender.name != user?.name ? dm.sender.id : dm.receiver.id}
										name={dm.sender.name != user?.name ? dm.sender.name : dm.receiver.name}
										isOnline={false}
										image={dm.sender.name != user?.name ? dm.sender.avatar : dm.receiver.avatar} />
              	))}
							</ul>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Content  */}
        <div className="w-full sm:w-96 lg:w-1/2 overflow-hidden">
          <div className=" h-[65rem] rounded-t-2xl rounded-b-xl m-6 bg-gray-60">
            <div className="min-h-[8rem] flex items-center justify-between m-1 p-3 rounded-t-2xl">
              {selected === 'friends' && dms.length != 0 && <div className='flex items-center justify-between w-full'>
								{dms.length != 0 && <div className='flex items-center'>
									<img className='w-[6rem] h-[6rem] rounded-full' src={friend.sender.id !== user.id ? friend.sender.avatar : friend.receiver.avatar} />
									<h2 className='ml-5 text-3xl font-bold italic cursor-pointer hover:underline' 
										onClick={goToProfile}>
										{friend.sender.id !== user.id ? friend.sender.name : friend.receiver.name}
									</h2>
								</div>}
								<button type="button" onClick={invitetoplay}
									className="font-bold text-xl text-white-6 focus:outline-none bg-gray-70 px-4 py-2 rounded-full hover:bg-white-6 hover:text-gray-70">
									Invite to play
								</button>
							</div>}
            	{selected === 'channels' && rooms.length != 0 && <div className='flex items-center justify-between w-full'>
								<div className='flex items-center'>
									<img className='w-[6rem] h-[6rem] m-w-[6rem] rounded-full' src={group?.chat.avatar} />
									<h2 className='ml-5 text-3xl font-bold italic'>{group?.chat.name}</h2>
								</div>
								<div className='flex items-center gap-3 min-h-[70px]'>
									{group?.role === 'OWNER' && <Link to={"/editegroup"} state={{data : group}}>
										<button className='bg-gray-70 p-[0.6rem] rounded-full text-2xl hover:bg-white-6 hover:text-gray-70'>
											<AiOutlineSetting />
										</button>	
									</Link>}
									{rooms.length > 0 && <button type="button" onClick={Quitbutton}
										className="font-bold text-xl text-white-6 focus:outline-none bg-gray-70 px-4 py-2 rounded-full hover:bg-white-6 hover:text-gray-70">
										Quit
									</button>}
								</div>
							</div>}

            </div>
            <div className='flex justify-end'></div>
            <div className="border-t border-white-6 border-double mt-1 "></div>
						{selected == 'friends'&& <ChatList dmId={dms.length != 0 ? friend.id : ''} user={user} prefix={'dm'}/>}
						{selected == 'channels' && <ChatList dmId={rooms.length != 0 ? group?.chat.id : ''} user={user} prefix={'chat'}/>}
            <div className="border-t border-black mt-7"></div>
            <form onSubmit={(e) => handleSubmitMessage(e)} className="flex p-2 relative" >
              <div className="flex w-full">
                <input value={message} onInput={(event: any) => setMessage(event.target.value)}
									type="text" id="first_name"
									className="bg-gray-40 border border-gray-300 text-gray-900 text-sm rounded-3xl block w-full p-4 mt-3 overflow-auto"
									placeholder="Write a message .." required />
              </div>
              <button onClick={(e) => handleSubmitMessage(e)} className="absolute right-7 top-8 border-l-[2px] pl-3">
                <FiSend style={{fontSize: '2rem'}} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Content */}
        {selected === 'friends' && <InfoCard user={dms.length != 0 ? friend?.sender.id != user.id ? friend?.sender : friend?.receiver : undefined}/>}
        {selected === 'channels' && <InfoCardGroup user={user} roomId={group?.chat.id || ''}/>}
        <ToastContainer theme="dark" />
      </div>
    </div>
  )
}

export default ChatPage

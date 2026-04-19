import *as React from 'react';
import { useState, useEffect } from "react";
import Axios from "../../context/Axios"
import '../../App.css'
import Navbar from "../../components/navbar";
import gold from '../../photos/gold-medal.png'
import silver from '../../photos/silver-medal.png'
import bronze from '../../photos/bronze-medal.png'
import Hamburger from 'hamburger-react'
import { useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import "react-toastify/dist/ReactToastify.css";
import bios from '../../photos/bios.png'
import freax from '../../photos/freaks.png'
import pandora from '../../photos/pandora.png'
import comodore from '../../photos/comon.png'
import paddle from  '../../photos/ping-pong.png'

type friendRequest = {
  id: string,
  since: string,
  sender: {
    id: string,
    name: string,
    avatar: string
  }
}

type GameHostory = {
    id: string,
    winnerScore: 0,
    loserScore: 0,
    at: string,
    winner: {
      id: string,
      name: string,
      avatar: string
    },
    loser: {
      id: string,
      name: string,
      avatar: string
    }
}

const FriendsList = () => {
	const [friends, setFriends] = useState<any>([])
	const navigate = useNavigate()

	useEffect(() => {
		(async() => {
			try {
				const res = await Axios('/friendship/accept/all')
				setFriends(res.data)
			} catch (error) {
        console.log(friends)
			}
		})();
	}, [])

	return (<ul className='pl-5 pr-5 flex text-center overflow-auto p-3 m-1 bg-gray-10 rounded-[50px] shadow-xl w-[93rem]'>
		{friends?.map((friend:any, key: number) => (
			<li key={key} className='shadow-lg pl-2 pr-2'>
				<img src={friend.friend.avatar} className='rounded-full w-[80px]' />
				<h3 className='font-bold mt-2 mb-2 hover:underline cursor-pointer' onClick={() => navigate(`/profile/${friend.friend.id}`)}>
					{friend.friend.name}
				</h3>
				<span className='p-1'>{friend.friend.status}</span>
			</li>
		))}
	</ul>)
}

const handleLogout = async () => {
	localStorage.removeItem('user')
	localStorage.removeItem('token')
  try {
    await Axios.post("logout");
  } catch (error) {
  }
}

const UserPage = () => {
	const navigate = useNavigate()

	const [visibility, setVisibility] = useState<string>('hidden')
	const [imageSrc, setImageSrc] = useState<string>('')
	const [code, setCode] = useState<string>('')

  const [userData, setUserData] = useState<undefined | any>(undefined)
	const [requests, setRequests] = useState<undefined | friendRequest[]>(undefined)
	const [gameHistory, setGameHistory] = useState<undefined | GameHostory[]>(undefined)
	const [error, setError] = useState(false)
	const [opacity, setOpacity] = useState('opacity-100')

	const acheivements = () => { 
		if (userData && userData.level < 30)	return bronze
		if (userData && userData.level < 100) return silver
		return gold
	}

	const acceptRequest = async (id: string) => {
		try {
			await Axios.post('friendship/accept', {id: id})
		fetchRequest()
		} catch (error) {
		}
	}

	const rejectRequest = async (id: string) => {
		try {
			await Axios.post('friendship/reject', {id: id})
			fetchRequest()
		} catch (error) {
		}
	}

	const toggle2FA = async (_2fa: boolean) => {
		if (_2fa) {
			setVisibility('block')
			setOpacity('opacity-60')
			return
		}
		try {
			const res = await Axios.post(`twofa/enable`)
			setVisibility('block')
			setImageSrc(res.data)
			setOpacity('opacity-60')
		} catch(error) {
		}
	}

	const fetchProfile = async() => {
    try {
      const response = await Axios.get("user/profile")
			setUserData(response.data)
    } catch (error) {
			setUserData(null)
    }
	}

	const fetchRequest = async() => {
		try {
			const res = await Axios.get('friendship/request/received/all')
			setRequests(res.data)
		} catch (error) {
		}
	}

	const fetchGameHistory = async() => {
		try {
			const res = await Axios('game/all')
			setGameHistory(res.data.splice(0, 2))
		} catch (error) {
		}
	}

  useEffect(() => {
		fetchProfile();
		fetchRequest();
		fetchGameHistory()
		return (() => {
			setUserData(undefined)
		})
  }, [])

  const [openHamburger, setOpenHamburger] = useState(false)
  const [openTransition, setOpenTransition] = useState(false)
	const [selectedPicture, setSelectedPicture] = useState<string>('');

  const toggleTransition = () => {
    setOpenTransition(!openTransition)
  }
  const toggleHamburger = () => {
    setOpenHamburger(!openHamburger)
  }
  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPicture(event.target.value);
		localStorage.setItem('gameMap', event.target.value)
  }

	if (userData === undefined) {
		return (<>Loading .. </>)
	} else if (userData === null) {
		navigate('/')
	}

	const verify = async () => {
		try {
			if (userData.account.isTwofaEnabled) {
				await Axios.post('/twofa/disable', {code: code})
				setImageSrc('')
				setVisibility('hidden')
				setError(false)
				return
			}
			await Axios.post('twofa/enable/verify', {
				code: code
			})
			setImageSrc('')
			setVisibility('hidden')
			setError(false)
		} catch(error) {
			setError(true)
		}
	}

	const cancel = () => {
		setVisibility('hidden')
		setImageSrc('')
		setCode('')
		setError(false)
		setOpacity('')
		setOpacity('opacity-100')
	}

  return (
    <div className='relative'>
      <Transition.Root show={openTransition} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={() => setOpenTransition(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          >
          <div className="fixed inset-0 bg-gray-10 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
                >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="font-semibold leading-6 text-gray-900 text-3xl italic">Requests</Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <ul>
												{requests?.map((invite, key) => (
                        <li className="mt-3 flex items-center justify-between shadow rounded-full" key={key}>
                          <img className="shrink-0 h-24 w-24 rounded-full my-2 mx-1" src={invite.sender.avatar} alt="" />
                          <div className="ltr:ml-3 rtl:mr-3" onClick={() => {navigate(`/profile/${invite.id}`)}}>
                            <p className="text-white-6 my-9 text-2xl mx-5 font-bold hover:underline cursor-pointer">{invite.sender.name}</p>
                          </div>
                          <div className="flex-grow" onClick={() => acceptRequest(invite.id)}>
                            <button className="bg-gray-70 rounded-xl px-3 py-1 text-sm hover:opacity-80">Accept</button>
                          </div>
                          <div className="flex-grow" onClick={() => rejectRequest(invite.id)}>
                            <button className="bg-gray-70 rounded-xl px-3 py-1 text-sm hover:opacity-80">Decline</button>
                          </div>
                        </li>
													))}
                      </ul>
                  </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
    </Dialog>
    </Transition.Root>

		<div className={`bg-gray-70 z-10 absolute top-[4rem] left-[38%] w-[30rem] my-[10rem] mx-auto flex flex-col items-center shadow-2xl px-10 pb-10 rounded-3xl ${visibility}`}>
			<span className='hover:text-red-77 absolute top-2 right-2 font-bold text-3xl text-gray-20 cursor-pointer' onClick={cancel}>X</span>
			<h2 className="my-[2rem] mx-1 text-2xl uppercase">two factor authentication</h2>
			<img src={imageSrc} className='w-full'/>
			<input id='code' placeholder="enter verification code .." type='text' value={code} onChange={(e) => setCode(e.target.value)}
				className={`w-full my-[1.5rem] p-2 text-xl rounded-lg ${error ? 'border-2 border-red-77' : ''}`} style={{ color: 'black' }} />
			<button className="rounded-xl hover:opacity-90 mb-1 p-2 text-xl bg-gray-10 w-full" onClick={verify}>verify</button>
			{error && <span className='text-red-77'>invalid verification code</span>}
		</div>

			{/* ///////////////////////////////// Page ////////////////////////////////////// */}
      <Navbar />
      <div id='body' className={`flex justify-center my-6 ${opacity}`}>
        <div className="w-[1500px] h-full">
          <div className="grid grid-cols-4 gap-x-2 gap-y-3 grid-flow-row-dense space-y-[10px] space-x-[10px]">
            <div className="bg-gray-10 rounded-[70px] shadow-xl min-h-[350px] col-span-4 pt-4">
              <div className="flex justify-start ml-[35px] mb-[30px]">
              <img
									className="justify-center place-self-center h-[200px] w-[200px] object-cover rounded-full mt-8"
  								src={userData.avatar} alt="Current profile photo"/>
                <div className="flex flex-col ml-[1000px]">
                	<button onClick={toggleTransition} className='mt-2'>
                	  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
  									<path strokeLinecap="round" strokeLinejoin="round"
											d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>
                	</button>
                  <button 
										className="hover:opacity-80 h-[3rem] w-[15rem] rounded-full border-solid border-2 bg-gray-40 mt-[150px] ml-[-100px] text-xl font-bold"
										onClick={() => navigate('/Wichgame')}>PLAY</button>
                    <button 
											className="h-[3rem] w-[15rem] rounded-full border-solid border-2 bg-gray-40 mt-[10px] ml-[-100px] hover:opacity-80 text-xl"
										onClick={() => toggle2FA(userData.account.isTwofaEnabled)}>
											{userData.account.isTwofaEnabled ? "Desable 2FA" : "Enable 2FA"}
										</button>
                  <p className="mx-[-900px] mb-[130px] h-[3rem] w-[15rem] text-6xl mt-[-100px]">{userData.name}</p>
                </div>
                <div className="justify justify-end ml-[-70px]">
                <Hamburger toggled={openHamburger} toggle={toggleHamburger} />
                  {openHamburger && (
                    <nav>
                      <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/setting">Setting</a></li>
                        <li><a href="/" onClick={() => {handleLogout()}}>Logout</a></li>
                      </ul>
                    </nav>
									)}
                </div>
              </div>
            </div>
            <div className="bg-gray-10 rounded-[50px] shadow-xl min-h-[50px] row-span-2 col-span-2 col-start-1 col-end-2" >
              <img className="justify-center place-self-start h-[100px] w-[100px] object-cover rounded-full ml-[130px] mt-[50px]"
                src={paddle}
                alt="Current profile photo"/>
              <div className="justify-center mt-[40px] ml-[10px]">
                <div className="justify-center mt-[50px] ">
                  <p className='text-xl font-bold text-center'>Level</p>
                  <div className="justify-center gap-10 mt-[10px]">
                    <p className='text-5xl text-center'>{userData.level}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-10 rounded-[50px] shadow-xl min-h-[50px] row-span-1 col-span-1 flex flex-col items-center" >
              <div className='text-2xl p-5 italic font-bold'>Wins</div>
              <div className='text-6xl'>{userData.wins}</div>
            </div>
            <div className="bg-gray-10 rounded-[50px] shadow-xl min-h-[450px] col-span-2 row-span-2" >
              <div className="flex justify-center mt-[33px] text-2xl italic font-bold">Match History</div>
								{gameHistory?.map((match, key) => (
									<div key={key} className="flex justify-center h-[5rem] w-[20rem] rounded-full ml-[210px] mt-[50px] bg-gray-40 relative">
                		<img className="cursor-pointer justify-center place-self-start h-[4rem] w-[4rem] object-cover rounded-full mt-[9px]"
                	  	src={match.winner.avatar} alt="Current profile photo"
											onClick={match.winner.id != userData.id ? () => navigate(`/profile/${match.winner.id}`) : () => {}}/>
										<p className='absolute top-5 left-[5.3rem] font-bold text-3xl'>{match.winnerScore}</p>
                		<img className="cursor-pointer justify-center place-self-end h-[4rem] w-[4rem] object-cover rounded-full ml-[170px] mb-[9px]"
                  		src={match.loser.avatar} alt="Current profile photo"
											onClick={match.loser.id != userData.id ? () => navigate(`/profile/${match.loser.id}`) : () => {}}/>
										<p className='absolute top-5 right-[5.3rem] font-bold text-3xl'>{match.loserScore}</p>
              		</div>
								))}
            	</div>
            <div className="bg-gray-10 rounded-[50px] shadow-xl min-h-[50px]" >
              <div className="justify-center mt-[25px] text-2xl italic font-bold text-center">Award
              	<img className="justify-center place-self-start h-[100px] w-[100px] object-cover rounded-full ml-[130px] mt-[50px]"
                	src={acheivements()}
                	alt="Current profile photo"/>
              </div>
            </div>
            <div className="bg-gray-10 shadow-xl min-h-[100px] col-span-4 round rounded-full" >
            <div>
  <div className="flex items-center">
    <div className="justify-center mt-[10px] ml-[300px] text-3xl font-italic text-blue-700 ">Game Board Theme</div>
    <div className='py-3'>
      <div className="flex">
        <label className='ml-[90px]'>
          <input
            type="radio"
            name="picture"
            value="bios"
            checked={selectedPicture === 'bios'}
            onChange={handlePictureChange}
          />
          <img
            className="justify-center place-self-start h-[70px] w-[70px] object-cover rounded-full mt-[5px] ml-[-18px]"
            src={bios} alt="Bios"/>
        </label>
        <label className='ml-[100px]'>
          <input
            type="radio"
            name="picture"
            value="freax"
            checked={selectedPicture === 'freax'}
            onChange={handlePictureChange}
          />
          <img
            className="justify-center place-self-start h-[70px] w-[70px] object-cover rounded-full mt-[5px] ml-[-18px]"
            src={freax}
            alt="Freax"
          />
        </label>
        <label className='ml-[100px]'>
          <input
            type="radio"
            name="picture"
            value="comodore"
            checked={selectedPicture === 'comodore'}
            onChange={handlePictureChange}
          />
          <img
            className="justify-center place-self-start h-[70px] w-[70px] object-cover rounded-full mt-[5px] ml-[-18px]"
            src={comodore}
            alt="Freax"
          />
        </label>
        <label className='ml-[100px]'>
          <input
            type="radio"
            name="picture"
            value="pandora"
            checked={selectedPicture === 'pandora'}
            onChange={handlePictureChange}
          />
          <img
            className="justify-center place-self-start h-[70px] w-[70px] object-cover rounded-full mt-[5px] ml-[-18px]"
            src={pandora}
            alt="Freax"
          />
											</label>
									</div>
										<div>
										</div>
									</div>
								</div>
							</div>
            </div>
						<FriendsList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage

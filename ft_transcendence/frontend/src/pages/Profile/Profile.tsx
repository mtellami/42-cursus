import { useState, useEffect } from "react";
import Axios from "../../context/Axios";
import '../../App.css'
import Navbar from "../../components/navbar";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/dist/ReactToastify.css";
import { Content } from './Content';
import { Result } from './Result';
import { Status } from './Status';
import gold from '../../photos/gold-medal.png'
import silver from '../../photos/silver-medal.png'
import bronze from '../../photos/bronze-medal.png'
import paddle from '../../photos/ping-pong.png'
import PageNotFound from '../PageNotFound/PageNotFound';
import { Burger } from './Burger';
import Hamburger from 'hamburger-react'

type ProfileType = {
  id: string,
  since: string,
  status: string,
  user: {
    id: string,
    name: string,
    avatar: string,
    level: number,
    wins: number,
    losses: number,
    achievements: [
      string
    ],
    lastSeen: string,
    status: string 
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

const Profile = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [us, setUs] = useState<undefined | null | ProfileType>(undefined)
	const [open, setOpen] = useState(false)
	const [userData, setUserData] = useState<any>(undefined)
	const [gameHistory, setGameHistory] = useState<undefined | GameHostory[]>(undefined)

	const acheivements = () => { 
		if (us && us.user.level < 30)	return bronze
		if (us && us.user.level < 100) return silver
		return gold
	}

const cancelRequest = async () => {
	try {
		await Axios.post('friendship/cancel', {id: us?.id})
		fetchProfile()
	} catch (error) {
	}
}

const acceptRequest = async () => {
	try {
		await Axios.post('friendshipt/accept', {id: us?.id})
		fetchProfile()
	} catch (error) {
	}
}

const unblock = async () => {
	try {
		await Axios.post('friendship/unblock', {id: us?.id})
		fetchProfile()
	} catch (error) {
	}
}

const unfriend = async () => {
	try {
		await Axios.post('friendship/remove', {id: us?.id})
		fetchProfile()
	} catch (error) {
	}
}

const addfriend = async () => {
	try {
		await Axios.post('friendship/request', {id: us?.user.id})
		fetchProfile()
	} catch (error) {
	}
}
	const fetchProfile = async() => {
		try {
			const res = await Axios.get(`user/profile/${id}`)
			setUs(res.data)
		} catch (error) {
			setUs(null)
		}
	}

	const block = async () => {
		try {
			await Axios.post('friendship/block', {id: us?.user.id})
			fetchProfile()
		} catch (error) {
		}
	}
	const contact = async () => {
		try {
			const res =  await Axios.post('/dm/new', {id: us?.user.id})
			// navigate(`/chat?dm=${res.data.id}`)
			navigate(`/chat?dm=${res.data.id}`)
		} catch (error) {
		}
	}

	const fetchUser = async () => {
		try {
			const res = await Axios('/user/profile')
			setUserData(res.data)
		} catch (error) {
		}
	}
	
	useEffect(() => {
		fetchUser();
		fetchProfile();
		(async () => {
			try {
				const res = await Axios(`game/all/${id}`)
				setGameHistory(res.data.splice(0, 2))
			} catch (error) {
			}
		})();
	}, [])

	if (us === undefined || userData === undefined) {
		return (<>Loading ..</>)
	} else if (us === null) {
		return (<PageNotFound />)
	} else {
  return (
    <div>               
      <Navbar />
      <div className="flex justify-center my-9">
        <div className="w-[1500px] h-full">
          <div className="grid grid-cols-4 gap-x-2 gap-y-3 grid-flow-row-dense space-y-[10px] space-x-[10px]">
            <div className="bg-gray-10 rounded-[70px] shadow-xl min-h-[350px] col-span-4">
              <div className="flex justify-start ml-[35px] mt-[5px] mb-[30px]">
                <img
                  className="justify-center place-self-center h-[18rem] w-[18rem] object-cover rounded-full mt-8"
                  src={us.user.avatar}
                  alt="Current profile photo"
                />
                  {Status(us)}
          			<div className="flex flex-col ml-[950px] mt-[10px]">
            			{Content(us, {
											unfriend,
											cancelRequest,
											acceptRequest,
											unblock,
											addfriend
										})}
            			<p className="animate-typing whitespace-nowrap text-5xl text-white font-bold mx-[-900px] h-[3rem] w-[15rem]">
										{us.user.name}
									</p>
          			</div>
									<div>
										<div className="justify justify-end ml-[-80px]">
											<Hamburger toggled={open} toggle={() => setOpen(!open)} />
											{open && (Burger(us, {
												block,
												contact,
											}))}
												</div>
									</div>
              </div>
            </div>
            <div className="bg-gray-10 rounded-[50px] shadow-xl min-h-[50px] row-span-2 col-span-2 col-start-1 col-end-2 flex flex-col items-center" >
              <img className="h-[100px] w-[100px] object-cover rounded-full mt-[30px]"
                src={paddle} alt="Current profile photo"/>
              <div>
                <div className="mt-[40px] text-center">
								</div>
                <div className="mt-[40px] text-center">
                  <p className='text-xl italic my-2'>Level</p>
                  <div className="text-5xl font-bold">{us.user.level}</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-10 rounded-[50px] shadow-xl min-h-[50px] row-span-1 col-span-1 flex items-center justify-around text-center"><div>
							<p className="text-2xl italic">Wins</p>
							<div className="justify-center text-2xl font-bold leading-9 tracking-tight mt-[5px]">
								<p className='text-5xl font-bold'>{us.user.wins}</p>
							</div>
						</div>
						<div>
								<p className="text-2xl italic">Loss</p>
								<div className="justify-center text-2xl font-bold leading-9 tracking-tight mt-[5px]">
									<p className='text-5xl font-bold'>{us.user.losses}</p>
								</div>
							</div>
						</div>
            <div className="bg-gray-10 rounded-[50px] shadow-xl min-h-[450px] col-span-2 row-span-2 " >
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
            <div className="bg-gray-10 rounded-[50px] shadow-xl min-h-[40px]" >
              <div className="mt-[25px] ml-[40px] text-2xl italic">Award</div>
              	<img className="w-[100px] object-cover ml-[130px]"
                	src={acheivements()}
                	alt="Current profile photo"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
	}
}

export default Profile;

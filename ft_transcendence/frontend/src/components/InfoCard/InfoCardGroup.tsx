import '../../App.css'
import { useEffect, useState } from "react";
import  Axios  from "../../context/Axios";
import TreePoints from '../shared/treePoints/treePoints';
import {role} from '../../interfaces/Chat'
import SocketContext from "../../context/Socket"
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { toast } from 'react-toastify';

interface usera {
  id : string,
  name : string
  avatar : string
  status : string
}

interface grouplist {
  role : role,
  user : usera
}

const InfoCardGroup = ({ roomId, user }: { roomId: string, user: any })  => {
	const [members, setMember] = useState<grouplist[]>([])
  const [rol, setRole] = useState()
  const navigate = useNavigate()
  const socket = useContext(SocketContext);

	const fetchMembers = async () => {
		if (roomId === '') return
		try {
			const res = await Axios.get(`chat/members?chatid=${roomId}`);
			setMember(res.data)
      const whois = res.data.find((mbr: any) => mbr.user.id == user.id)
      setRole(whois?.role)
		} catch (error: any) {
		}
	}
	
	useEffect(() => {
		fetchMembers();
	}, [])

  const invitetoplay = (id: string) => {
    socket.emit('game_invite_game', { id: id })
    toast(<div>Game invite sended</div>)
    socket.on('game_join_game', (liveGame: any) => {
      localStorage.setItem('liveGame', JSON.stringify(liveGame))
      navigate('/game')
    })
  }

  const adminUpDown = async (userRole: string, roomId: string, userId: string) => {
    const action = userRole === role.ADMIN ? 'unset' : 'set'
    try {
      await Axios.post(`chat/${action}admin?chatid=${roomId}`, {id: userId})
			fetchMembers();
    } catch (error) {
    }
  }

  const mute = async (roomId: string, userId: string) => {
		const action = rol == role.OWNER ? 'Admin' : 'Member'
    try {
      await Axios.post(`chat/mute${action}?chatid=${roomId}`,{
        id: userId,
        duration: 100,
      })
			fetchMembers();
    } catch (error) {
    }
  }

  const kickBan = async (action: string, roomId: string, userId: string) => {
		const route = rol == role.OWNER ? 'Admin' : 'Member'
    try {
      await Axios.post(`chat/${action}${route}?chatid=${roomId}`, {
        id:	userId, 
      })
			fetchMembers();
    } catch (error) {
    }
  } 

	const viewMember = (id: string) => {
		if (user.id === id) {
			navigate('/userpage')
		} else  {
			navigate(`/profile/${id}`)
		}
	}

  let owner : grouplist[] = members?.filter(user => user.role === 'OWNER')
  let admins : grouplist[] = members?.filter(user => user.role === 'ADMIN')
  let member : grouplist[] = members?.filter(user => user.role === 'MEMBER')

  return (
    <div className="sm:w-1/5 flex overflow-hidden">
      <div className="h-[65rem] rounded-t-3xl w-[28rem] rounded-b-xl my-6 bg-gray-60 overflow-y-auto">
        {roomId && <div className="py-1">
          <div>
            {owner.length != 0 && <div className="mt-4 ml-8 font font-semibold text-3xl italic">Owner</div>}
            {owner && owner.map((ow, key) => (
              <div key={key} className="mx-6 group mt-3 flex items-center">
                  <img className="shrink-0 h-24 w-24 rounded-full" src={ow.user.avatar}/>
                  <div className="ltr:ml-3 rtl:mr-3">
                    <p className="text-white-6 ml-[1rem] text-3xl font font-bold group-hover:text-white hover:underline"
										onClick={() => viewMember(ow.user.id)}>{ow.user.name}</p>
                </div>
              </div>
            ))}
            </div>  
          <div className="mt-[3rem]">
						{admins.length != 0 && <div className="italic ml-8 font font-semibold text-3xl mt-5">Admins</div>}
            {admins && admins.map((admin, key) => (
                <div key={key}>
                    <ul>
                      <li>
                        <div className="mx-6 group mt-3 flex items-center  justify-between">
                          <img className="shrink-0 h-24 w-24 rounded-full" src={admin.user.avatar}  alt="" />
                          <div className="ltr:ml-3 rtl:mr-3">
                            <p className="text-white-6 ml-4 text-3xl font font-bold group-hover:text-white hover:underline"
															onClick={() => viewMember(admin.user.id)}>{admin.user.name}</p>
                          </div>
                          <div className="ml-[5rem] mt-[-7.5rem] mb-14">
                          	{rol === role.OWNER && <TreePoints user={admin} whois={rol } roomId={roomId} funcs={{
															invitetoplay,
															adminUpDown,
															mute,
															kickBan,
														}} />} 
                           </div>
                        </div> 
                      </li>
                    </ul>
                </div>
            ))}
          </div>
          <div>
          <div className="">
						{member.length != 0 && <div className="app ml-8 font font-semibold text-3xl mt-5 italic">Memebers</div>}
            {member && member.map((mbr, key) => (
                <div key={key}>
                  <ul className="">
                  <li>
                    <div className="mx-6 group mt-3 flex items-center justify-between">
                      <img className="shrink-0 h-24 w-24 rounded-full" src={mbr.user.avatar} alt="" />
                      <div className="ltr:ml-3 rtl:mr-3">
                        <p className="text-white-6 ml-4 text-3xl font font-bold group-hover:text-white hover:underline"
														onClick={() => viewMember(mbr.user.id)}>{mbr.user.name}</p>
                      </div>
                      <div className="ml-[5rem] mt-[-7.5rem] mb-14">
                        {rol && user.id !== mbr.user.id 
                          && <TreePoints user={mbr} whois={rol} roomId={roomId} funcs={{
															invitetoplay,
															adminUpDown,
															mute,
															kickBan,
													}} />}
                      </div>
                    </div> 
                  </li>                      
                </ul>
                </div>
            ))}
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default InfoCardGroup

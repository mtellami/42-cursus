import pongo from '../../photos/pengogo.png'
import Navbar from "../../components/navbar"
import { useNavigate } from 'react-router-dom'
import { LiveGame } from '../../interfaces/game'
import { useEffect, useState } from 'react'
import robot from '../../photos/robot.png'
import Axios from '../../context/Axios'

const AIMoDe = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState<any>(undefined)

	useEffect(() => {
		(async () => {
			try {
				const res = await Axios('/user/profile')
				setUser(res.data)
			} catch (error) {
				setUser(null)
			}
		})();
	}, [])

	const modeLevel = (level: number) => {
		const liveGame: LiveGame = {
			id: '12345',
			sender: {id: `${user?.id}`, name: `${user?.name}`, avatar: `${user?.avatar}`, level: user?.level},
			receiver: {id: `${level}`, name: 'aiBoot', avatar: robot}
		}
		localStorage.setItem('liveGame', JSON.stringify(liveGame))
		navigate('/game')
	}

	if (user === undefined) {
		return <>Loading ..</>
	} else if (user === null) {
		navigate('/')
	}

  return (
    <div>
      <Navbar/>
			<div className="text-center m-[3rem]">
					<h2 className="font-bold">Mannual</h2>
					<p className="italic">Use mouse to move the paddle! the first player score 5 points is the winner</p>
			</div>
    	<div className="flex justify-center place-self-center -mt-20">
        <div className=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 rounded-t-3xl rounded-b-3xl m-10 h-[50rem] w-[30rem] mt-28 bg-gray-60 drop-shadow-2xl" >
          <img className="ml-24 h-40 mt-16  " src={pongo} alt="pongo"/>
          <div className="flex justify-center text-5xl font-bold mt-8"> VS </div>
          <div className="flex justify-center text-5xl font-bold ">PENGO</div>
          <div className="flex justify-center text-3xl mt-6 italic"> Challenge our AI</div>
          <div className="flex justify-center text-3xl italic mt-1" >from easy to hard </div>
          <button className="flex justify-center ml-36 mt-7 h-16 w-48 rounded-t-3xl rounded-b-3xl bg-gray-70 cursor-pointer"> 
          <p className="hover:opacity-50 m-4 font-semibold text-2xl" onClick={() => {modeLevel(1)}}>Easy</p>
          </button><br/>
          <button className="flex justify-center ml-36 mt-1 h-16 w-48 rounded-t-3xl rounded-b-3xl bg-gray-70">
          <p className="hover:opacity-50 m-4 font-semibold text-2xl" onClick={() => {modeLevel(2)}}>Medium</p>    
          </button><br/>
          <button className="flex justify-center ml-36 mt-1 h-16 w-48 rounded-t-3xl rounded-b-3xl bg-gray-70">
            <p className="hover:opacity-50 m-4 font-semibold text-2xl" onClick={() => {modeLevel(3)}}>Hard</p>   
          </button>
        </div>
    	</div>
    </div>
  )
}

export default AIMoDe

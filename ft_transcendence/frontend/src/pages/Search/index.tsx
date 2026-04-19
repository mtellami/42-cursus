import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar";
import SearchBar from "../../components/shared/serach/SearchBar";
import InfGrp from "../../components/shared/InfoGrp/InfGrp";
import { grp } from "../../interfaces/Chat"
import axios from "../../context/Axios"

import CardInfoUG from "./CardInfoUG";


export interface User {
  id: string;
  name: string;
  avatar: string;
}

const Search = () => {
  const [search, setSearch] = useState<string>('')
	const [users, setUsers] = useState<User[] | undefined>(undefined)
	const [groups, setGroups] = useState<grp[] | undefined>(undefined)
	const navigate = useNavigate()

  const handleClickuser = (id: string) => {
		navigate(`/profile/${id}`)
	}

  const handleClickgrp = async (id : string, password?: string) => {
		const data: {id: string, password?: string} = {
			id: id
		}
		if (password != undefined) {
			data.password = password
		}
		try {
			await axios.post('chat/join', data)
			navigate(`/chat?room=${id}`)
		} catch (error) {
		}
	}

	useEffect(() => {
		if (search == '') {
			setUsers([])
			setGroups([])
			return
		}
		(async () => {
			try {
				const res = await axios.get(`user/search/${search}`)
				if (res.status = 200) {
					const data = res.data
					setUsers(data)
				} else {
					throw new Error('cant get users')
				}
			} catch (error) {
			}})();
		(async () => {
			try {
				const res = await axios.get(`chat/search/${search}`)
				const data: grp[] = res.data
				const gps = data.filter(obj => obj.name.includes(search))
				setGroups(gps)
			} catch (error) {
			}})()
	}, [search])

  return(
    <div>
      <Navbar />
      <SearchBar setSearch={setSearch}/>
      <div className="flex flex-wrap justify-center mt-16 space-x-28">
        <div className="font">
          <div className="pt-3 h-[55rem] w-[30rem] rounded-t-3xl rounded-b-3xl m-6 bg-gray-10">
            <div className="bg-gray-70 ml-40 p-2 px-6  w-40 rounded-3xl text-4xl font-bold">
              <p className="ml-3">Users</p>
            </div>
            <div className="flex flex-col items-center w-full h-[49rem] overflow-hidden">
              <ul className="w-full overflow-y-auto mt-5">
                {users?.map(usr => {
                  return (
                  	<CardInfoUG key={usr.id}
											handleClick={handleClickuser}
											id={usr.id}
											name={usr.name}
											showOnline={false}
											userIsOnline={false}
											image={usr.avatar}
										/>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="font !m-0">
          <div className="pt-3 h-[55rem] w-[30rem] rounded-t-3xl rounded-b-3xl m-6 bg-gray-10">
            <div className="bg-gray-70 ml-40  p-2 px-6  w-48 rounded-3xl text-4xl font-bold">
              <p className="ml-">Channels</p>
            </div>
            <div className="flex flex-col items-center w-full h-5/6 overflow-hidden">
              <ul className="w-full overflow-y-auto">
                {groups?.map(group => {
                  return (
                  	<InfGrp key={group.id}
											handleClick={handleClickgrp}
											id={group.id}
											name={group.name}
											status={group.status}
											userIsOnline={false}
											image={group.avatar}
										/>
                  )
                })}
              </ul>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Search;

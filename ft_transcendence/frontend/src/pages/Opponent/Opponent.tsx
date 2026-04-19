import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from 'react';
import Axios from "../../context/Axios";
import { ToastContainer, toast } from 'react-toastify';

const Opponent = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [username, setUsername] = useState<string>('');

	const [user, setUser] = useState<any>(undefined)
	const [error, setError] = useState(false)
	const navigate = useNavigate()

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  }
	const save = async () => {
		setError(false)
		try {
			if (selectedFile) {
				const formData = new FormData();
      	formData.append("file", selectedFile);
				await Axios.post('user/avatar',formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					}
				})
			}
		} catch (error) {
			setError(true)
			toast(<div>Failed to change avatar</div>)
		}
		try {
			const name = username.trim()
			if (name != '') {
				await Axios.post('user/name', {
					name: username
				})
			}
		} catch (error) {
			setError(true)
			toast(<div>Failed to change name</div>)
		}
		if (!error) {
			toast(<div>changes saved successfully</div>)
		}
	}

	useEffect(() => {
		(async () => {
			try {
				const res = await Axios('/user/profile')
				setUser(res.data)
				setUsername(res.data.name)
			} catch (error) {
				toast(<div>failed to save changes</div>)
			}
		})();
		return (() => {
			setError(false)
		})
	}, [])

	if (user === undefined) {
		return (<>Loading ..</>)
	}

    return (
      <div>
        <Navbar/>
        <div className="flex justify-center place-self-center -mt-1">
        <div className=" transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 
          duration-300 rounded-t-3xl rounded-b-3xl m-10  h-[45rem] w-[30rem] mt-28 ml-4  bg-gray-40 drop-shadow-2xl" >
        <form className="flex justify-center place-self-center -mt-15">
          <div className="shrink-0">
            <img className=" justify-center place-self-center  h-[14rem] w-[14rem]  object-cover rounded-full mt-8" src={user?.avatar} alt="Current profile photo" />
          </div>
          <label className="block"></label>
        </form>
      	<div className={`flex justify-center place-self-center`}>
        <input type="text" placeholder="Enter username .." value={username}
							onChange={(e) => setUsername(e.target.value)}
							style={{ color: '#000' }}
							className="h-[3rem] w-[15rem] rounded-full mt-20 border-solid border-4 border-gray-200 p-5">
        </input>
              </div>
              <div className="mt-10 flex justify-center place-self-center">
              <button className="flex justify-center place-self-center h-[3rem] w-[15rem] rounded-full border-solide border-2 bg-white-500  ">  
              {/* <Link to={'userpage'}></Link> */}
              <input type="file" accept="image/*" className="hidden" onChange={handleFileInputChange} id="fileInput"/>
      <label
        htmlFor="fileInput"
        className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded-lg hover:bg-blue-600">Select a Picture</label>
      </button>
      </div>
      <div className=" flex justify-center place-self-center">
        <button onClick={save}
          className="h-[3rem] w-[10rem] rounded-full mt-20 mb-4 border-solid border-4 border-gray-200 bg-white-500">
          SAVE
        </button>
					</div>
					{error && <span className="text-xl italic ml-[9rem] opacity-80" style={{color: 'red'}}>
							Failed to save change
					</span>}
    		</div>        
      	</div>
        <ToastContainer theme="dark" />
     	</div>     
  )
}

export default Opponent

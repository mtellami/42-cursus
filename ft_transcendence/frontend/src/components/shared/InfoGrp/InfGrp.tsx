import { chatStatus } from '../../../interfaces/Chat'
import { useState } from 'react';
import Axios from 'axios';

type Props = {
	handleClick: (id: string, password?: string) => void;
    logo?: File | any;
    name: string;
    message?: string;
    id: string;
    status: chatStatus;
    userIsOnline: boolean;
    image : string | undefined;
}

const InfGrp = (props: Props) => {
  const handleClick = () => {
		setInvalid(false)
		if (props.status != chatStatus.PROTECTED) {
			props.handleClick(props.id); 
		} else {
			setShowModal(true)
		}
  }
	const checkPassword = async () => {
		props.handleClick(props.id, password)
		setInvalid(true)
	}

  const [showModal, setShowModal] = useState(false);
  const [Invalid , setInvalid] = useState(false)
	const [password, setPassword] = useState<string>('')

  return (
    <div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40">
						</div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white-6 rounded-md shadow-lg">
                <div className="mt-3 sm:flex flex justify-center">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <p className='text-gray-60 text-2xl ml-8'>Enter PassWord</p>
                    {Invalid ? <>
                      <input value={password}
													className='py-2 ml-1 text-xl text-white-6 bg-gray-90 ring-red-77 ring-offset-2 ring-2 rounded-full pl-10 focus:outline-none focus:bg-white w-96 h-16'
													type='password' onChange={(e) => setPassword(e.target.value)} />
                        <p className='mt-3 text-red-77 text-xl'>Invalid Password</p> 
                    	</> : <input className='py-2 ml-1 text-xl text-white-6 bg-gray-90 rounded-full pl-10 focus:outline-none focus:bg-white w-96 h-16'
												type='password' onChange={(e) => setPassword(e.target.value)} />}
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                          className="w-20 mt-2 p-2.5 flex-1 text-white-6 bg-gray-70 rounded-md outline-none ring-offset-2 ring-white-6 focus:ring-2"
                          onClick={checkPassword}>Save
                      </button>
                      <button
                        className="w-20 mt-2 p-2.5 flex-1 text-white-6  bg-gray-70 rounded-md outline-none border ring-offset-2 ring-white-6 focus:ring-2"
                        onClick={() => {setShowModal(false); setInvalid(false)}}>Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
        <li onClick={handleClick}
            className='flex items-center justify-between w-full rounded-full my-2 border border-[#494b60] shadow-lg p-1 space-x-2 cursor-pointer'>
            <div className="flex flex-shrink-0 relative" >
              <img className="ml-1 object-cover w-20 h-20 rounded-full" src={(props.logo !== undefined) ? (props.logo) : props.image} alt="User logo" />
            </div>
            <div className="flex flex-col items-start w-full rounded-full">
              <p className="ml-3 text-3xl text-gray-900 truncate dark:text-white">
                  {props.name}
              </p>
              {props.status === chatStatus.PROTECTED && 
                <div className='w-full flex justify-end'>
                  <button className='' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </button>
               </div>}
            </div>
        </li>
    </div>
  )
}

export default InfGrp

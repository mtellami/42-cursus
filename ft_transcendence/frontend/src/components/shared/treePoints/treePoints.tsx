import { useState } from "react";
import {role} from '../../../interfaces/Chat'
import { ToastContainer, toast } from 'react-toastify';

interface usera {
  id : string,
  name : string
  avatar : string
  status : string
}

interface grouplist {
  role : role,
  user : usera
};


type Props = {
    user : grouplist,
    whois : role,
    roomId: string
		funcs: any,
}

const TreePoints = (props : Props) =>{

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
   return (
    <div className="flex justify-center mt-44 relative  text-center">
      <button
        onClick={toggleMenu}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-white-6 bg-white  rounded-lg hover:bg-gray-40 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-70 dark:bg-gray-80 dark:hover:bg-gray-70 dark:focus:ring-gray-40"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div>
        <div
          className="-ml-52 absolute  mt-7  bg-gray-90 divide-y divide-gray-70 rounded-lg shadow w-44 dark:bg-gray-40 dark:divide-gray-40"
          >
          <ul
            className="px-2 text-sm text-gray-700 dark:text-gray-200"            >
            <li>
              <button
                onClick={() => {props.funcs.invitetoplay(props.user.user.id); setIsMenuOpen(false) }}
                className="block px-4 py-2 w-full hover:bg-gray-70 dark:hover:bg-gray-40 dark:hover:text-white-6"
                >
                Invite to play
              </button>
            </li>
            {props.whois === role.OWNER ?
            <li>
              <button
              onClick={() => {props.funcs.adminUpDown(props.user.role, props.roomId, props.user.user.id); setIsMenuOpen(false)}}
              className=" block px-4 py-2 w-full hover:bg-gray-70 dark:hover:bg-gray-60 dark:hover:text-white"
              >
                {props.user.role === role.MEMBER ? <p>Promote to Admin</p> : ""}
                {props.user.role === role.ADMIN ? <p>Promote to Member</p> : ""}
              </button>
            </li> : ""}
						{props.whois !== role.MEMBER ?<> 
						<li>
                <button
                onClick={() => {props.funcs.mute(props.roomId, props.user.user.id); setIsMenuOpen(false)}}
                className=" block px-4 py-2 w-full hover:bg-gray-70 dark:hover:bg-gray-60 dark:hover:text-white"
                >
                Mute
                </button>
          </li>
          <li>
                <button
                onClick={() => {props.funcs.kickBan('ban', props.roomId, props.user.user.id); setIsMenuOpen(false)}}
                className=" block px-4 py-2  hover:bg-gray-70 w-full dark:hover:bg-gray-60 dark:hover:text-white"
                >
                Ban
                </button>
          </li>
          <li>
                <button
                onClick={() => {props.funcs.kickBan('kick', props.roomId, props.user.user.id); setIsMenuOpen(false)}}
                className=" block px-4 py-2 w-full hover:bg-gray-70 dark:hover:bg-gray-60 dark:hover:text-white"
                >
                Kick
                </button>
          </li></> : ''}
          </ul>
        </div>
        </div>
      )}
        <ToastContainer theme="dark" />
    </div>
  );
}

export default TreePoints;

import { Link, Navigate } from 'react-router-dom';
import defultUserLogo from '../../photos/defultUserLogo.png';
import { useNavigate } from "react-router-dom";

type Props = {
    logo?: File | any;
    userIsOnline: boolean;
    name: string | undefined;
    message: string;
}


const InfoUser = (props: Props) => {
    const navigate = useNavigate();
    const logoDefault: File | any = (props.logo !== undefined) ? (props.logo) : defultUserLogo;

  return (
        <div className='flex items-center justify-between w-full space-x-4'>
        <div className="flex flex-shrink-0 relative" >
            <span className="absolute text-green-500 right-0 bottom-0">
            </span>
            <img onClick={()=>{navigate(`/chat`)}} className="object-cover w-14 h-14 rounded-full cursor-pointer" src={logoDefault} alt="User logo" />
        </div>
        <div className="flex items-center justify-between w-full ">
            <div className="flex flex-col items-start justfiy-between">
                <p className="text-3xl text-gray-900 truncate dark:text-white">
                    {props.name}
                </p>
                <p className="text-1xl -mt-1 text-gray-500 truncate dark:text-gray-400">
                    {/* {props.message} */}
                </p>
            </div>
        </div>
    </div>
  )
}

export default InfoUser

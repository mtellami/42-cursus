import defultUserLogo from '../../photos/defultUserLogo.png';
import {listofgroup, role} from '../../interfaces/Chat';
import {Link } from "react-router-dom";

type props = {
    group : listofgroup | undefined
}


const InfoGroup = (props: props) => {
    const logoDefault: File | any = (props.group?.chat.avatar !== undefined) ? (props.group.chat.avatar) : defultUserLogo;

  return (
        <div className='flex items-center justify-between w-full space-x-4'>
        <div className="flex flex-shrink-0 relative" >
            {props.group?.role === 'OWNER' ?
            <Link to={"/editegroup"} state={{data : props.group}}>
            <img className="object-cover w-24 h-24 rounded-full cursor-pointer" src={logoDefault} alt="User logo" />
            </Link>  : <img className="object-cover w-24 h-24 rounded-full cursor-pointer" src={logoDefault} alt="User logo" />}
        </div> 
        <div className="flex items-center justify-between w-full ">
            <div className="flex flex-col items-start justfiy-between">
                <p className="text-4xl text-gray-900 truncate dark:text-white">
                    {props.group ? props.group.chat.name : ""}
                </p>
                <p className="text-1xl -mt-1 text-gray-500 truncate dark:text-gray-400">
                    {/* {props.message} */}
                </p>
            </div>
        </div>
    </div>
  )
}

export default InfoGroup

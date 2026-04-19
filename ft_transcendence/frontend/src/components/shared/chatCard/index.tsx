import { useNavigate } from 'react-router-dom';
import defultUserLogo from '../../../photos/defultUserLogo.png'

type Props = {
    right: boolean;
    message: string;
    logo?: string
		id?: string,
}

const ChatCard = (props: Props) => {
	const navigate = useNavigate()

	const viewProfile = () => {
		if (!props.right && props.id !== '') {
			navigate(`/profile/${props.id}`)
		}
	}
	
    return (
      <div className='flex flex-col p-2' >
        <div className={`flex ${props.right ? "justify-end" : "" }`}>
          <div className="flex items-center justify-between gap-2 p-1">
            {!props.right &&
                <img onClick={viewProfile} className="object-cover w-14 h-14 rounded-full cursor-pointer" src={props.logo == '' ? defultUserLogo : props.logo} alt="User logo" />}
            <p className=" break-all border rounded-2xl p-2 text-xl">{props.message}</p>
          </div>
        </div>
      </div>
    )
}

export default ChatCard

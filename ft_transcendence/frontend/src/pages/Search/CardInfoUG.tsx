type Props = {
    handleClick: (id: string) => void;
    logo?: File | any;
    name: string;
    message?: string;
    id: string;
    showOnline: boolean;
    userIsOnline: boolean;
    image : string | undefined;
}

const CardInfoUG = (props: Props) => {

    const messageExist: boolean = (props.message !== undefined);
    const logoDefault: File | any = (props.logo !== undefined) ? (props.logo) : props.image;
    let newMessage: string = (messageExist) ? `${props.message}` : "";

    if (props.message !== undefined && props.message.length > 25) {
        const indexEnd = props.message.indexOf(" ", 25);
        newMessage = props.message.slice(0, indexEnd) + " ...";
    }
    
    const handleClick = () => {
        props.handleClick(props.id);
    }

  return (
    <div>
    <li 
        onClick={handleClick}
        className='flex items-center justify-between w-full rounded-full my-2 border border-[#494b60] shadow-lg p-1 space-x-2 cursor-pointer'
        >
        <div className="flex flex-shrink-0 relative" >
            {props.showOnline && 
                <span className="absolute text-green-500 right-0 bottom-0"></span>
            }
            <img className="ml-1 object-cover w-20 h-20 rounded-full" src={logoDefault} alt="User logo" />
        </div>
        <div className="flex flex-col items-start w-full rounded-full">
            <p className="ml-3 text-3xl text-gray-900 truncate dark:text-white">
                {props.name}
            </p>
            {messageExist && 
                <p className="text-1xl -mt-1 text-gray-500 truncate dark:text-gray-400">
                    {/* {newMessage} */}
                </p>
            }
        </div>
    </li>
    </div>
  )
}

export default CardInfoUG

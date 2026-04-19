
type Props = {
  handleClick: () => void;
  name: string;
  message?: string;
  id: string;
  isOnline: boolean;
  image : string;
	item: any
}

const ItemInfo = (props: Props) => {
  const messageExist: boolean = (props.message !== undefined);
  let newMessage: string = (messageExist) ? `${props.message}` : 'jib m3ak khayt byad ...';

  if (props.message !== undefined && props.message.length > 25) {
      const indexEnd = props.message.indexOf(" ", 25);
      newMessage = props.message.slice(0, indexEnd) + " ...";
  }
  
  return (
    <li onClick={props.handleClick}
      className='flex items-center justify-between rounded-full my-2 border border-[#494b60] shadow-lg p-1 space-x-2 cursor-pointer'
      >
      <div className="flex flex-shrink-0 relative" >
        {props.isOnline && <span className="absolute text-green-500 right-0 bottom-0"></span>}
        <img className="ml-1 object-cover w-20 h-20 rounded-full" src={props.image} alt="User logo" />
      </div>
      <div className="flex flex-col items-start w-full rounded-full">
        <p className="ml-3 text-3xl text-gray-900 truncate dark:text-white">{props.name}</p>
        {/* <p className="text-1xl ml-3 truncate ">{newMessage}</p> */}
      </div>
    </li>
  )
}

export default ItemInfo

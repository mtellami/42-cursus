import { useContext, useEffect, useRef, useState } from 'react';
import ChatCard from '../../components/shared/chatCard';
import SocketContext from '../../context/Socket';
import { WsMessageType } from '../../pages/chat/datatypes';

const ChatList = ({ dmId, user, prefix }: { dmId: string | undefined, user:any, prefix: string }) => {
	const [msgs, setMessages] = useState<WsMessageType[]>([])
	const socket = useContext(SocketContext)
	const divRef = useRef<HTMLUListElement | null>(null)

	useEffect(() => {
		socket.emit(`${prefix}_join`, { chatid: dmId })
		socket.on(`${prefix}_join`, (data: WsMessageType[]) => {
			setMessages(data)
		})
		// const chat = document.querySelector('#window')
		// if (chat) {
		// 	chat.scrollTop = chat.scrollHeight
		// }
	}, [msgs])

	useEffect(() => {
		socket.on(`${prefix}_message`, (data: WsMessageType) => {
			if (data.chatid === dmId) {
				setMessages([...msgs, data])
			}
		})
	}, [socket])

	if (msgs === undefined)
		return <div className='h-3/4'> </div>
  return (
    <div className="flex flex-col items-center justify-btween pl-2 w-full h-3/4 overflow-hidden">
      <ul id='window' ref={divRef} className="w-full overflow-y-auto ">
      {dmId && msgs.map((message, key) => (
        <li className="break-words" key={key}>
					{user.id == message.sender.id ? 
							<ChatCard key={key} message={message.content} right={true} /> :
							<ChatCard key={key} message={message.content} right={false} logo={message.sender.avatar} id={message.sender.id}/>
					}
        </li>
				))
      }
      </ul>
    </div>
  )
}

export default ChatList

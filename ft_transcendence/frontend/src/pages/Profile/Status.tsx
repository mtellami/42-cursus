import green from '../../photos/PC57-Green-Screen.png'
import playing from '../../photos/ping-pong.png'
import gray from '../../photos/download.png'

export const Status = (user: any) => {
  let status: React.ReactNode
	switch (user.user.status) {
		case 'Online':
			status = <div className="flex justify-center mt-[33px] text-2xl italic font-bold bg-gray-10 rounded full">
        <img className="justify-center place-self-start h-[20px] w-[20px] object-cover rounded-full mt-[42px] mx-[5px]"
          src={green} alt="Current profile photo"
          />
        <div className="flex justify-center mt-[33px] text-2xl italic font-bold bg-gray-10 rounded full" />
        <div className="flex justify-center mt-[33px] text-2xl italic font-bold bg-gray-10 rounded full">Online</div>
      </div>
		break

		case 'InGame':
			status = <div className="flex justify-center mt-[33px] text-2xl italic font-bold bg-gray-10 rounded full">
        <img className="justify-center place-self-start h-[25px] w-[25px] object-cover rounded-full mt-[42px] mx-[5px]"
          src={playing} alt="Current profile photo"/>
        <div className="flex justify-center mt-[33px] text-2xl italic font-bold bg-gray-10 rounded full" />
        <div className="flex justify-center mt-[33px] text-2xl italic font-bold bg-gray-10 rounded full">InGame</div>
      </div>
		break

		case 'Offline':
			status = <div className="flex justify-center mt-[33px] text-2xl italic font-bold bg-gray-10 rounded full">
    		<img className="justify-center place-self-start h-[20px] w-[20px] object-cover rounded-full mt-[42px] mx-[5px]"
          src={gray} alt="Current profile photo"/>
      	<div className="flex justify-center mt-[33px] text-2xl italic font-bold bg-gray-10 rounded full" />
      	<div className="flex justify-center mt-[33px] text-2xl italic font-bold bg-gray-10 rounded full">Offline</div>
    	</div>
	}
	return status
}

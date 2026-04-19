import Axios from '../../context/Axios'


export const Content = (user: any, funcs: any) => {
  let content: React.ReactNode
	switch(user.status) {
		case 'unfriend':
      content = <div>
        	<button onClick={funcs.unfriend} 
						className="h-[3rem] w-[15rem] rounded-full border-solid border-2 bg-gray-40 mt-[8rem] ml-[-200px] hover:opacity-80">
        		  Unfriend
        	</button>
        </div>
			break;

		case 'cancel request':
      content = <div>
       <button onClick={funcs.cancelRequest}
					className="h-[3rem] w-[15rem] rounded-full border-solid border-2 bg-gray-40 mt-[8rem] ml-[-200px] hover:opacity-80">
      	Cancel Request
      </button>
      </div>
				break;

		case 'accept friend':
      content = <div>
      <button onClick={funcs.acceptRequest}
					className="h-[3rem] w-[15rem] rounded-full border-solid border-2 bg-gray-40 mt-[8rem] ml-[-200px] hover:opacity-80">
        Accept Friend
    	</button>
      </div>
			break;

		case 'unblock':
      content = <div>
      <button onClick={funcs.unblock}
					className="h-[3rem] w-[15rem] rounded-full border-solid border-2 bg-gray-40 mt-[8rem] ml-[-200px] hover:opacity-80">
        Unblock
    	</button>
      </div>
			break;

		case 'add friend':
      content = <div>
      <button onClick={funcs.addfriend}
					className="h-[3rem] w-[15rem] rounded-full border-solid border-2 bg-gray-40 mt-[8rem] ml-[-200px] hover:opacity-80">
        ADD FRIEND
    	</button>
      </div>
			break;
	}
	return content
}

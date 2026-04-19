import Axios from "axios";

const logout = async () => {
	localStorage.removeItem('user')
	localStorage.removeItem('token')
}

export const Burger = (user:any, funcs: any) => {
  let burger: React.ReactNode

	switch(user.status) {
		case 'unfriend':
			burger = <ul>
					<li className='cursor-pointer' ><a onClick={funcs.contact}>Contact</a></li>
					<li className='cursor-pointer' ><a onClick={funcs.block}>Block</a></li>
				</ul>
			break;

		case 'cancel request':
			burger = <ul>
            		<li className='cursor-pointer' ><a onClick={funcs.contact}>Contact</a></li>
								<li><a onClick={funcs.block}>Block</a></li>
          		</ul>
				break;

		case 'accept friend':
		burger =	<ul>
						<li className='cursor-pointer' ><a onClick={funcs.contact}>Contact</a></li>
						<li><a onClick={funcs.block}>Block</a></li>
        			</ul>
			break;

		case 'add friend':
		burger =	<ul>
            		<li className='cursor-pointer' ><a onClick={funcs.contact}>Contact</a></li>
					<li className='cursor-pointer' ><a onClick={funcs.block}>Block</a></li>
          		</ul>
			break;
	}
	return burger
}

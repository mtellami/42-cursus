import { ImSearch } from 'react-icons/im';
import { MdLeaderboard } from 'react-icons/md';
import { AiFillMessage } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaGamepad } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';

import Logo from '../../photos/pp-res.png'

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Props = {
    onClick: () => void ;
}


const NavbarItems = (props: Props) => {
  return (
    <motion.nav
        className='flex items-center justify-between m-3 gap-24 w-[1000px] cursor-pointer'
        onClick={props.onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
    >
        
        {/* Othere icons */}
        {/* <MdLeaderboard size={30} className='cursor-pointer' /> */}

        {/* Search Icon */}
        <Link to="/Search">
          <ImSearch size={50} className='cursor-pointer' />
        </Link>
        
        {/* Message Icon */}
        <Link to="/chat">
        <AiFillMessage size={50} className='cursor-pointer' />
        </Link>

          <img height={120} width={120}  src={Logo} alt="" onClick={props.onClick} className='cursor-pointer' />
        
        {/* Profile Icon */}
        <Link to="/userpage">
        <CgProfile size={50} className='cursor-pointer'/>
        </Link>
        
        {/* Game Icon */}
        <Link to="/WichGame">
        <FaGamepad size={50} className='cursor-pointer' />
        </Link>

        {/* Notification Icon */}
        {/* <IoMdNotifications size={30} className='cursor-pointer' />     */}

    </motion.nav>
  )
}

export default NavbarItems

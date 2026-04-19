import Logo from '../../photos/pp-res.png'
import NavbarItems from './NavbarItems';
import { useState } from 'react';

const Navbar = () => {

  const flexBetween = "flex items-center justify-between";

  const [showNavBar, setShowNavBar] = useState(false);

  const handleOnClickLogo = (): void => {
    setShowNavBar(!showNavBar);
  }
  
  return (
    <nav className='w-full'>
      <div className={`${flexBetween} top-0 w-full py-6 `} >
        <div className={`${flexBetween} mx-auto rounded-full border border-gray-20`} >
          {showNavBar && <NavbarItems onClick={handleOnClickLogo}   />}
          {!showNavBar && 
              <button 
                onMouseEnter={handleOnClickLogo} >
                  <img className='object-cover' height={150} width={150} src={Logo} alt="" />
              </button>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar

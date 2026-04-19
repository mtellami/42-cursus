import ParticlesBg from 'particles-bg'
import logo2 from '../../photos/pp-res.png';
import logo from '../../photos/42.png';
import './SignInPage.css';
import { Link } from "react-router-dom";

const SignInPage = () => {
  const path:string = process.env.REACT_APP_FORTY_TWO_API_URI!;

  return (
    <div className="">
      <ParticlesBg color="#EBEEFF" num={350} type="cobweb" bg={true} />
        <div className=" ml-5 mt-96 w-56 h-24">
          <button id="sign_in" className=" button-78 ">
          	<Link to={path}>
            <div className="flex flex-row">
              <div>
                <img className="ml-10 w-15 h-50" src={logo} alt="Logo" />
              </div>
              <div className="ml-4 mt-2 mb-2">Network</div>
            </div>
            </Link>
          </button>
        </div>
      <div className='body grid grid-cols-1  place-items-center'>
        <img className="w-56 h-24" src={logo2} alt="Logo" />
      </div>
    </div>
  )
}

export default SignInPage;

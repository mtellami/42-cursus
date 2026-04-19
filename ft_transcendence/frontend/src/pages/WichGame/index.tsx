import Navbar from "../../components/navbar";
import Pengogo from "../../photos/pengogo.png"
import Mannette from "../../photos/manette1.png"
import { Link } from "react-router-dom";

const WichGame = () => {
  return (
  <div className="mt-5 max-h-screen overflow-hidden">
    <Navbar/ >
    <div className=" mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-56">
          <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <Link to={"/AIMoDe"}>
            <div className="rounded-t-3xl rounded-b-3xl m-10 h-[45rem] w-[35rem] bg-gray-60 drop-shadow-2xl">
            <div className= "flex justify-center place-self-center">
              <img className="  h-44 m-28 " src={Pengogo} alt="pengogo" />
            </div>
            <div className="flex justify-center text-5xl font-bold -mt-14"> VS </div>
            <div className="flex justify-center text-5xl font-bold "> PENGO</div>
            <div className="flex justify-center text-3xl mt-8 italic"> Challenge our AI</div>
            <div className="flex justify-center text-3xl italic mt-2" >from easy to hard </div>
            </div> 
          </Link>
          </button>
          <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
          <Link to={"/ONlineMoDe"}>
          <div className="rounded-t-3xl rounded-b-3xl m-10 h-[45rem] w-[35rem]  bg-gray-60 drop-shadow-2xl ">
            <div className="flex justify-center">
              <img className="m-20 h-56" src={Mannette} alt="manette" />
            </div>
            <div className="flex justify-center text-5xl font-bold -mt-7 ">ONLNE</div>
            <div className="flex justify-center text-3xl mt-11 italic">Play vs random person</div>
            <div className="flex justify-center text-3xl italic mt-2"> to rank up</div>
          </div> 
          </Link>
          </button>
        </div>
      </div>
    </div>
  </div>
  ) 
}

export default WichGame

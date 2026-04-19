import './InfoCard.css'
import gold from '../../photos/gold-medal.png'
import silver from '../../photos/silver-medal.png'
import bronze from '../../photos/bronze-medal.png'

const InfoCard = ({ user}: { user: any }) => {
  return (
    <div className="sm:w-1/5 hidden lg:block">
      <div className="h-[65rem] w-[22rem] rounded-t-3xl rounded-b-xl my-6 bg-gray-60 flex justify-center">
				{user && <div>
          <img className='max-w-full rounded-full w-48 h-48 mt-20' src={user.avatar} alt="photo" />
          <p className='font flex justify-center mt-10 mb-[4rem] text-3xl font-semibold capitalize'>{user.name}</p>
          <p className='flex justify-center mt-10 font text-3xl '>Level</p>
          <p className='flex justify-center font-semibold text-4xl mt-6'>{user.level ? user.level : 0}</p>
          <p className="flex justify-center ml-2 mt-[5rem] font text-3xl">Achievements</p>
          <img className="ml-7 mt-10 rounded-full h-36 w-36 object-cover" src={user?.level > 30 ? gold : user?.level > 20 ? silver : bronze } alt="photo" />
        </div>}
      </div>
    </div>
  )
}

export default InfoCard;

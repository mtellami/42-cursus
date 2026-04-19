export const Result = (Dataaa: any) => {
  let result : React.ReactNode;

  switch (Dataaa?.lastmatches ? Dataaa.lastmatches.length : 0) {
    case 0:
      result = <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '8vh', // You can adjust the height as needed
        borderRadius: '10px', // Add a border radius for a rounded look
        padding: '20px', // Add padding for spacing
        color: 'white', // Text color
        fontSize: '24px', // Font size
      }}>
        You haven't played any match yet.
        What are you waiting for?
      </div>
      break;

    case 1:
      result = <div className="flex justify-center h-[200px] w-[600px] rounded-full ml-[70px] mt-[50px] bg-gray-40">
            <img className="  justify-center place-self-start h-[8rem] w-[8rem] object-cover rounded-full  mt-[35px] ml-[0px]"
              src={Dataaa ? Dataaa.lastmatches[0].avatar : "https://i.imgur.com/8Km9tLL.jpg"}
              alt="Current profile photo"
            />
            <div className='ml-[20px] mt-[90px]'> {Dataaa ? Dataaa.lastmatches[0].opp_score : 1234}</div>
            <div className='ml-[260px] mt-[90px]'> {Dataaa ? Dataaa.lastmatches[0].player_score : 1234}</div>
            <img className="  justify-center place-self-end h-[8rem] w-[8rem] object-cover rounded-full ml-[20px] mb-[35px]"
              src={Dataaa ? Dataaa.avatarUrl : "https://i.imgur.com/8Km9tLL.jpg"}
              alt="Current profile photo"
            />
          </div>
      break;
    default:
      result = <div>
       <div className="flex justify-center h-[5rem] w-[20rem] rounded-full ml-[200px] mt-[50px] bg-gray-40">
       <img className="  justify-center place-self-start h-[4rem] w-[4rem] object-cover rounded-full  mt-[9px]"
                  src={Dataaa ? Dataaa.lastmatches[Dataaa.lastmatches.length - 2].avatar : "https://i.imgur.com/8Km9tLL.jpg"}
                  alt="Current profile photo"
                  />
                  <div className='ml-[10px] mt-[30px]'> {Dataaa ? Dataaa.lastmatches[Dataaa.lastmatches.length-2].opp_score : 1234}</div>
                  <div className='ml-[130px] mt-[30px]'> {Dataaa ? Dataaa.lastmatches[Dataaa.lastmatches.length-2].player_score : 1234}</div>
                 <img className="  justify-center place-self-end h-[4rem] w-[4rem] object-cover rounded-full ml-[10px] mb-[9px]"
                  src={Dataaa ? Dataaa.avatarUrl : "https://i.imgur.com/8Km9tLL.jpg"}
                  alt="Current profile photo"
                  />
              </div>

              <div className="flex justify-center h-[5rem] w-[20rem] rounded-full ml-[200px] mt-[50px] bg-gray-40">
              <img className="  justify-center place-self-start h-[4rem] w-[4rem] object-cover rounded-full mt-[9px]"
                  src={Dataaa ? Dataaa.lastmatches[Dataaa.lastmatches.length - 1].avatar : "https://i.imgur.com/8Km9tLL.jpg"}
                  alt="Current profile photo"
                  />
                  <div className='ml-[10px] mt-[30px]'> {Dataaa ? Dataaa.lastmatches[Dataaa.lastmatches.length-1].opp_score : 1234}</div>
                  <div className='ml-[130px] mt-[30px]'> {Dataaa ? Dataaa.lastmatches[Dataaa.lastmatches.length-1].player_score : 1234}</div>
                 <img className=" justify-center place-self-end h-[4rem] w-[4rem] object-cover rounded-full ml-[10px] mb-[9px]"
                  src={Dataaa ? Dataaa.avatarUrl : "https://i.imgur.com/8Km9tLL.jpg"}
                  alt="Current profile photo"
                  />
              </div>
                  </div>
      break;
  }
	return result
} 

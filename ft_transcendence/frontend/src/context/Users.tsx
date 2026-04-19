import React, { createContext, useState, PropsWithChildren, useContext} from "react";
import { my } from '../interfaces/User'

interface AuthProps {
  user : any,
  setUser : any,
}

export const UsersContext = createContext({} as AuthProps);

export const myContext = createContext<[my | undefined, React.Dispatch<React.SetStateAction<my | undefined>>]>([undefined, () => {}]); 

export const MyProvider = ({children} : PropsWithChildren<{}>) => {
  const [add, Setadd] = useState<my>();
  return (
    <myContext.Provider value={[add, Setadd]}>
      {children}
    </myContext.Provider>
  )
}

export const UsersProvider = ({children} : PropsWithChildren<{}>) => {
	const [user, Setuseer] = useState(null);
  const setUser = (user : any) => {
    Setuseer(user);
  }

	return (
    <UsersContext.Provider value={{user, setUser}}>
      {children}
    </UsersContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(UsersContext);
	return context;
}

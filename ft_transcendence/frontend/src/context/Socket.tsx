import { io, Socket } from "socket.io-client";
import { createContext, ReactNode, useEffect } from "react";

const SocketContext = createContext<Socket>(io(''));

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const token = localStorage.getItem("token");
	const socket: Socket = io(`${process.env.REACT_APP_HOST_URI}`, {
		auth: { token: token }
	})

	useEffect(() => {
		return () => {
			// socket.disconnect()
		}
	}, [])

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	)
}

export default SocketContext;

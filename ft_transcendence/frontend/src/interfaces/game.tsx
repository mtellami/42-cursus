export interface LiveGame {
  id: string;
  sender: {
    id: string;
    name: string;
		avatar: string
		level?: string,
  }
  receiver: {
    id: string;
    name: string;
		avatar: string,
		level?: string,
  }
}

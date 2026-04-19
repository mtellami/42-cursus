import {chatStatus, grp } from "../../interfaces/Chat";
import { onlin, User } from "../../interfaces/User";
import ONlineMoDe from "../ONlineMoDe/ONlineMoDe";

export const gs : grp [] = [
  {
    id : '9',
    name : "string",
    avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Metallica_at_The_O2_Arena_London_2008.jpg/1200px-Metallica_at_The_O2_Arena_London_2008.jpg",
    status : chatStatus.PUBLIC,
  },
  {
    id : '4',
    name : "hola senior",
    avatar : "https://1000logos.net/wp-content/uploads/2017/02/Guns-N-Roses-Logo.png",
    status : chatStatus.PROTECTED,
  }
]

export const us : User[] = [
  {
      id: "1",
      name: "Blackiie",
      message: "hi",
      avatarUrl: "https://cdn.intra.42.fr/users/30a34185ebc4412a1c6d96d231588d75/mbelbiad.jpg",
      isOnline: onlin.Online,
  },
  {
      id: "2",
      name: "Zigola",
      message: "hi",
      avatarUrl: "https://cdn.intra.42.fr/users/b7e8d361963a790fb277e00de0837ca9/iel-mach.jpg",
      isOnline: onlin.Offline,
  },
  {
      id: "3",
      name: "Lhaaj",
      message: "hi",
      avatarUrl: "https://cdn.intra.42.fr/users/73866bd53ddc4e2f33a4a33ca099879e/mhabibi-.jpg",
      isOnline: onlin.InGame,
  },
  {
      id: "4",
      name: "0xshel",
      message: "hi",
      avatarUrl: "https://cdn.intra.42.fr/users/d299e7407e52208b58f01f70d4bad268/m-boukel.JPG",
      isOnline: onlin.Offline,
  },
  {
      id: "5",
      name: "sabiri",
      message: "hi",
      avatarUrl: "https://cdn.intra.42.fr/users/719e231c5b47de030d8965f4be5e701f/aessabir.jpg",
      isOnline: onlin.Offline,
  },
  {
      id: "6",
      name: "caapo",
      message: "hi",
      avatarUrl: "https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg",
      isOnline: onlin.Offline,
  },
]

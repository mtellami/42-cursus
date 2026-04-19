<div align="center">

# 🛸​  ​&nbsp; FT_TRANSCENDENCE  ​&nbsp;  🛸​
<hr>

> This project is about creating a website for the mighty Pong contest!

</div>

## 🔶​ Overview
ft_transcendence from 42 School is the last project of the common core. The goal is to create a web app to play Pong and socialize with other users.
### Usage
```zsh
docker compose up --build
```

## 🔶​ Tech-stack
### Frontemd
<img src="https://skillicons.dev/icons?i=tailwind" /> &nbsp; <img src="https://skillicons.dev/icons?i=ts" /> &nbsp; <img src="https://skillicons.dev/icons?i=react" />

### backend
<img src="https://skillicons.dev/icons?i=nestjs" /> &nbsp; <img src="https://skillicons.dev/icons?i=prisma" /> &nbsp; <img src="https://skillicons.dev/icons?i=postgres" />

## 🔷​ Frontend
### Pages
- Login
<img src="https://github.com/mtellami/ft_transcendence/blob/master/preview/login.png" />

- Profile
<img src="https://github.com/mtellami/ft_transcendence/blob/master/preview/profile.png" />

- Chat
<img src="https://github.com/mtellami/ft_transcendence/blob/master/preview/chat.png" />

- Game
<img src="https://github.com/mtellami/ft_transcendence/blob/master/preview/game.png" />

## 🔷​ Backend
The server is responsible for providing necessary data (CRUD from the database ) on different endpoints and handles the game matchmaking system, broadcast messages on chat rooms and DM, live game coordinates, and more ...

### Controllers
Login and authentication
```console
/auth
```

user profile, search, setting
```console
/user
```

Friendship: relations, Request, Block ...
```console
/friendship
```

Chat room services: create, join, leave
```console
/chat
```

Game: live games, game history, wins, loses
```console
/game
```

### Websocket events
- Direct messages
```zsh
'dm_message', 'dm_history', 'dm_join'
```

- Chat
```zsh
'chat_message', 'chat_history', 'chat_join'
```

- Game
```zsh
'join_game', 'invite_game', 'game_coordinates', 'find_peer' ...
```

## 🔷​ Database
### Postgresql - Prisma Schema
```prisma
model User {
  id                  String        @id @default(uuid())
  name                String        @unique @db.VarChar(35)
  avatar              String
  level               Int           @default(0)
  wins                Int           @default(0)
  losses              Int           @default(0)
  achievements        String[]      @default([])
  lastSeen            DateTime      @default(now())
  status              UserStatus    @default(Offline)
  account             Account?
  sentFriendships     Friendship[]  @relation("Sent")
  receivedFriendships Friendship[]  @relation("Received")
  chatMember          ChatMember[]
  chatMessgaes        ChatMessage[]
  sentGameInvit       GameInvite[]  @relation("Sent")
  receivedGameInvit   GameInvite[]  @relation("Received")
  sentGame            LiveGame[]    @relation("Sent")
  receivedGame        LiveGame[]    @relation("Received")
  winnedGame          GameHistory[] @relation("Winned")
  losedGame           GameHistory[] @relation("Losed")
  sentDM              Dm[]          @relation("SentDm")
  receivedDM          Dm[]          @relation("ReceivedDm")
  dmMessages          DmMessage[]
}

model GameInvite {
  id             String   @id @default(uuid())
  sender         User     @relation("Sent", fields: [senderid], references: [id])
  senderid       String
  senderSocketId String
  receiver       User     @relation("Received", fields: [receiverid], references: [id])
  receiverid     String
  createAt       DateTime @default(now())
}

model LiveGame {
  id         String @id @default(uuid())
  sender     User   @relation("Sent", fields: [senderid], references: [id])
  senderid   String
  receiver   User   @relation("Received", fields: [receiverid], references: [id])
  receiverid String
}

model GameHistory {
  id          String   @id @default(uuid())
  winner      User     @relation("Winned", fields: [winnerid], references: [id])
  winnerid    String
  loser       User     @relation("Losed", fields: [loserid], references: [id])
  loserid     String
  winnerScore Int
  loserScore  Int
  at          DateTime @default(now())
}

model Dm {
  id         String      @id @default(uuid())
  sender     User        @relation("SentDm", fields: [senderid], references: [id])
  senderid   String
  receiver   User        @relation("ReceivedDm", fields: [receiverid], references: [id])
  receiverid String
  messages   DmMessage[]
  createAt   DateTime    @default(now())
  updateAt   DateTime    @updatedAt
}

model DmMessage {
  id       String   @id @default(uuid())
  sender   User     @relation(fields: [senderid], references: [id], onDelete: NoAction)
  senderid String
  chat     Dm       @relation(fields: [chatid], references: [id], onDelete: Cascade)
  chatid   String
  content  String
  at       DateTime @default(now())
}

model Chat {
  id        String        @id @default(uuid())
  name      String
  avatar    String
  messages  ChatMessage[]
  members   ChatMember[]
  status    ChatStatus    @default(PUBLIC)
  password  String        @default("")
  createdAt DateTime      @default(now())
}

model ChatMember {
  id         String           @id @default(uuid())
  user       User             @relation(fields: [userid], references: [id], onDelete: Cascade)
  userid     String
  chat       Chat             @relation(fields: [chatid], references: [id], onDelete: Cascade)
  chatid     String
  role       ChatMemberRole
  status     ChatMemberStatus @default(NORMAL)
  createdAt  DateTime         @default(now())
  mutedUntil DateTime?
}

model ChatMessage {
  id       String   @id @default(uuid())
  sender   User     @relation(fields: [senderid], references: [id], onDelete: NoAction)
  senderid String
  chat     Chat     @relation(fields: [chatid], references: [id], onDelete: Cascade)
  chatid   String
  content  String
  at       DateTime @default(now())
}

model Account {
  id                  String   @id @unique
  owner               User     @relation(fields: [id], references: [id], onDelete: Cascade)
  intraId             Int      @unique
  coalition_name      String
  coalition_image_url String
  coalition_cover_url String
  coalition_slug      String
  createdAt           DateTime @default(now())
  isTwofaEnabled      Boolean  @default(false)
  twofaSecret         String   @default("")
}

model Friendship {
  id         String           @id @default(uuid())
  status     FriendshipStatus @default(PENDING)
  sender     User             @relation("Sent", fields: [senderId], references: [id], onDelete: Cascade)
  senderId   String
  receiver   User             @relation("Received", fields: [receiverId], references: [id], onDelete: Cascade)
  receiverId String
  since      DateTime         @updatedAt
}

```
## 🔷​ Contributors
- <a href="https://github.com/Sagittariu5A">Jaouad Chakir</a>
- <a href="https://github.com/mihlane">Mohammed Habibi Ihlane</a>
- <a href="https://github.com/mustapha-belbiad">Mustapha Belbiad</a>
- <a href="https://github.com/iel-mach">Issam El machkour</a>

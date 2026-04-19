import { User } from "@prisma/client";

export type UserPublicData = Omit<User, 'lastSeen' | 'status'> ;

import { SetMetadata } from '@nestjs/common';
import { ChatMemberRole } from '@prisma/client';

export const CHAT_ROLES_KEY = 'CHAT_ROLES_KEY';

export const ChatRoles = (...roles: ChatMemberRole[]) => SetMetadata(CHAT_ROLES_KEY, roles);

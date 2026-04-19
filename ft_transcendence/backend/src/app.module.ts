import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './common/config/config.module';
import { AuthJwtModule } from './common/jwt/jwt.module';
import { FriendshipModule } from './friendship/friendship.module';
import { ChatModule } from './chat/chat.module';
import { DmModule } from './dm/dm.module';
import { GameModule } from './game/game.module';
import { WSModule } from './websocket/websocket.module';
import { RefreshTokenInterceptor } from './common/interceptors/refresh-token.interceptor';

@Module({
  imports: [
    PrismaModule,
    UserModule, 
    AuthModule,
    AppConfigModule,
    AuthJwtModule,
    FriendshipModule,
    ChatModule,
    DmModule,
    GameModule,
    WSModule,
  ],
  controllers: [AppController,],
  providers: [
    AppService,
    RefreshTokenInterceptor,
],
})
export class AppModule {}

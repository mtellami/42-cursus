import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { HttpModule } from "@nestjs/axios";
import { AuthGuard } from "./auth.guard";
import { TwofaModule } from "src/twofa/twofa.module";

@Module({
    imports: [HttpModule, TwofaModule],
    controllers: [AuthController, ],
    providers: [AuthService, AuthGuard, ],
    exports: [AuthGuard, ]
})
export class AuthModule {}

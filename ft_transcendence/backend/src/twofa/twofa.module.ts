import { Module } from "@nestjs/common";
import { TwofaController } from "./twofa.controller";
import { TwofaService } from "./twofa.service";

@Module({
    controllers: [TwofaController, ],
    providers: [TwofaService, ],
})
export class TwofaModule {}

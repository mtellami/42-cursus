import { Module } from "@nestjs/common";
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            isGlobal: true,
            cache: true,
            expandVariables: true,
            validationSchema: Joi.object({
              DB_NAME:                 Joi.string().required(),
              DB_USER:                 Joi.string().required(),
              DB_PASS:                 Joi.string().required(),
              APP_PORT:                Joi.number().default(3000),
              JWT_SECRET:              Joi.string().required(),
              FORTY_TWO_CLIENT_ID:     Joi.string().required(),
              FORTY_TWO_CLIENT_SECRET: Joi.string().required(),
              FORTY_TWO_API_URI:       Joi.string().required().regex(/^(http|https):\/\//),
              CDN_HOST_URI:            Joi.string().required().regex(/^(http|https):\/\//),
              HOST_URI:                Joi.string().required().regex(/^(http|https):\/\//),
            }),
          }),
    ],
    exports: [ConfigModule, ]
})
export class AppConfigModule {}

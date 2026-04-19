import { WsException } from "@nestjs/websockets";

export class WsBadRequestException extends WsException {
    constructor(message: string | unknown) {
      super({error: 'BadRequest', message } );
    }
  }
  
  export class WsUnauthorizedException extends WsException {
    constructor(message: string | unknown) {
      super({error: 'Unauthorized', message } );
    }
  }
  
  export class WsInternalServerErrorException extends WsException {
    constructor(message: string | unknown) {
      super({error: 'Internal Server Error', message } );
    }
  }


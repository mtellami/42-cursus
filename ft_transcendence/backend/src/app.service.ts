import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  login(): string {
    const redirect_uri = this.configService.get('FORTY_TWO_API_URI');

    return `
    <!DOCTYPE html>
    <html>
    <body>
    
    <button onclick="window.location.href='${redirect_uri}';"
      style="font-size:20px; padding:10px 20px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">
      login with intra.42.fr
    </button>
    
    </body>
    </html>
    `;
  }

}

import { HttpException } from '@nestjs/common';
import { Response } from 'express';

export function redirect(response: Response, location: string): void {
  response.setHeader('Location', location);
  throw new HttpException('', 302);
}

export function setBearerCookie(response: Response, token: string): void {
  response.cookie('Bearer', token, {
    path: '/',
    // secure: true,
    httpOnly: true,
    // sameSite: 'none',
  });
}

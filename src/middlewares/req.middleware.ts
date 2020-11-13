import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ReqMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any) {
    console.log('req中间件 过滤auth');

    next();
  }
}

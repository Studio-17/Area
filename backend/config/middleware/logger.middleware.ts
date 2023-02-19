import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger();
    res.on('finish', () => {
      if (res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 304) {
        logger.log(`${req.method} - ${req.url} - ${res.statusCode}`);
      } else {
        logger.error(`${req.method} - ${req.url} - ${res.statusCode} :`);
        logger.error(`${res.statusMessage}`);
      }
    });
    next();
  }
}

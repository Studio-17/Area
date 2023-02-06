import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthenticationGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    // console.log('----- GUARD -----', user);
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid JWT (Json Web Token)');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}

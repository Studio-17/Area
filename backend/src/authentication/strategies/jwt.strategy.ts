import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtInterface } from '../interfaces/jwt.interfaces';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtInterface) {
    const user = await this.authenticationService.validateUserByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

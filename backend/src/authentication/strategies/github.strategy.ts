if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/api/authenticathor/github/redirect`,
      scope: ['user:email'],
    });
  }
  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const user = await this.authenticationService.validateUserByEmail(profile.emails[0].value);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

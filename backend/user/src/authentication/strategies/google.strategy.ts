import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/api/authenticathor/google/redirect`,
      scope: ['email', 'profile'],
    });
  }
  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    console.log('access_token:', _accessToken);
    const user = await this.authenticationService.validateUserByEmail(profile.emails[0].value);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

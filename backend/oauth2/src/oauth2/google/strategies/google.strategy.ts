import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GoogleOAuth2Strategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:4000/api/reaccoon/oauth2/google/redirect`,
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/drive',
      ],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    if (!profile.emails[0].value) {
      throw new UnauthorizedException();
    }

    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    return { profile, accessToken, refreshToken };
  }
}

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserInterface } from '../user/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
import { JwtInterface } from './interfaces/jwt.interfaces';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_ACCOUNT_CLIENT_ID,
  process.env.GOOGLE_ACCOUNT_CLIENT_SECRET,
);

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Used in the CONTROLLER to register a user
  public async register(registerUserDto: UserRegisterDto): Promise<UserInterface> {
    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);

    const jwtPayload = this.createJwtPayload(registerUserDto);
    registerUserDto.jwt = jwtPayload.token;

    return this.usersService.create(registerUserDto);
  }

  // Used LOCALLY to return a user if found
  private async validate(email: string): Promise<UserInterface> {
    return await this.usersService.findByEmail(email);
  }

  // Used in the CONTROLLER to log a user
  public async login(loginDto: UserLoginDto): Promise<any | { status: number; message: string }> {
    return this.validate(loginDto.email)
      .then((userData) => {
        if (!userData) {
          throw new UnauthorizedException();
        }

        const passwordIsValid = bcrypt.compareSync(loginDto.password, userData.password);

        if (!passwordIsValid == true) {
          return {
            message: 'Authentication failed. Wrong password',
            status: 400,
          };
        }

        const payload = {
          id: userData.uuid,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
          expiresIn: 3600,
          accessToken: accessToken,
          user: payload,
          status: 200,
        };
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      });
  }

  // Used LOCALLY to create JWT based on user profile
  protected createJwtPayload(user) {
    const data: JwtInterface = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      userId: user.uuid,
      email: user.email,
      expiresIn: 3600,
      token: jwt,
    };
  }

  // Used in the STRATEGY to check if user exists and return its associated token
  public async validateUserByEmail(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }

  public async oauth(email: string): Promise<any | { status: number; message: string }> {
    return this.validate(email)
      .then((userData) => {
        if (!userData) {
          throw new UnauthorizedException();
        }

        const payload = {
          id: userData.uuid,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
          expiresIn: 3600,
          accessToken: accessToken,
          user: payload,
          status: 200,
        };
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
      });
  }

  public async googleConnect(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ACCOUNT_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const isExistingUser = await this.usersService.exist(payload.email);

    const user = await this.usersService.findByEmail(payload.email);
    const jwtPayload = this.createJwtPayload(user);

    if (!isExistingUser) {
      await this.usersService.create({
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        password: '',
        jwt: jwtPayload.token,
      });
    } else {
      await this.usersService.updateUser(user.uuid, {
        jwt: jwtPayload.token,
      });
    }
    return user;
  }

  public async facebookConnect() {
    return undefined;
  }
}

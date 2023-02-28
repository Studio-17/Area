import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserInterface } from '../user/interface/user.interface';
import * as bcrypt from 'bcryptjs';
import { JwtInterface } from './interfaces/jwt.interfaces';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { OAuth2Client } from 'google-auth-library';
import { UserEntity } from '../user/entity/user.entity';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

const client = new OAuth2Client(
  process.env.GOOGLE_ACCOUNT_CLIENT_ID,
  process.env.GOOGLE_ACCOUNT_CLIENT_SECRET,
);

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
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

        const updatedUser = this.usersService.updateUser(userData.uuid, {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          jwt: accessToken,
        });

        return {
          accessToken: accessToken,
          user: payload,
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
    const user: UserEntity = await this.usersService.findByEmail(email);

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

  public async googleConnect(token: string): Promise<any | { status: number; message: string }> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const isExistingUser: boolean = await this.usersService.existByEmail(payload.email);

    if (!isExistingUser) {
      const user = {
        email: payload.email,
      };
      const jwt = this.createJwtPayload(user);

      const userCreated = await this.usersService.create({
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        password: '',
        jwt: jwt.token,
      });

      return {
        user: userCreated,
        accessToken: jwt.token,
      };
    } else {
      const user: UserEntity = await this.usersService.findByEmail(payload.email);
      const jwt = this.createJwtPayload(user);

      await this.usersService.updateUser(user.uuid, {
        jwt: jwt.token,
      });

      return {
        user: user,
        accessToken: jwt.token,
      };
    }
  }

  public async googleConnectMobile(
    token: string,
  ): Promise<any | { status: number; message: string }> {
    const userInfos = await lastValueFrom(
      this.httpService
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`)
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(() => error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );
    const isExistingUser: boolean = await this.usersService.existByEmail(userInfos.email);

    if (!isExistingUser) {
      const user = {
        email: userInfos.email,
      };
      const jwt = this.createJwtPayload(user);

      const userCreated = await this.usersService.create({
        email: userInfos.email,
        firstName: userInfos.given_name,
        lastName: userInfos.family_name,
        password: '',
        jwt: jwt.token,
      });

      return {
        user: userCreated,
        accessToken: jwt.token,
      };
    } else {
      const user: UserEntity = await this.usersService.findByEmail(userInfos.email);
      const jwt = this.createJwtPayload(user);

      await this.usersService.updateUser(user.uuid, {
        jwt: jwt.token,
      });

      return {
        user: user,
        accessToken: jwt.token,
      };
    }
  }

  public async facebookConnect() {
    return undefined;
  }
}

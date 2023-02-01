import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserInterface } from '../user/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
import { JwtInterface } from './interfaces/jwt.interfaces';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Used in the CONTROLLER to register a user
  public async register(registerUserDto: UserRegisterDto): Promise<UserInterface> {
    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);
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
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }

  // Used LOCALLY to create JWT based on user profile
  protected createJwtPayload(user) {
    const data: JwtInterface = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
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
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }
}

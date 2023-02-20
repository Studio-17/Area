import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../../../user/user.service';
import { CredentialsService } from '../../../../credentials/credentials.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CredentialsGuard implements CanActivate {
  constructor(
    private readonly usersService: UserService,
    private readonly credentialsService: CredentialsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const user = await this.usersService.findById(request.user.id);

    if (!user) {
      throw new UnauthorizedException('Unknown user_id provided');
    }

    const credential = await this.credentialsService
      .findById(user.uuid, 'github')
      .then((res) => res)
      .catch((error) => error);

    if (!credential.accessToken) {
      throw new UnauthorizedException('Invalid user_id provided, credentials missing');
    }

    request.credentials = credential;

    return true;
  }
}

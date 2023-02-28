import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { ServiceList } from '../../../../service/entity/service.entity';

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
      .findById(user.uuid, ServiceList.TWITCH)
      .then((res) => res)
      .catch((error) => error);

    if (!credential.accessToken) {
      throw new UnauthorizedException('Invalid user_id provided, credentials missing');
    }

    request.credentials = credential;

    return true;
  }
}

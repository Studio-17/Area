import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService();

export const UserId = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const jwt = request.headers.authorization.replace('Bearer ', '');
  const json = jwtService.decode(jwt, { json: true }) as { id: string };

  if (!json) {
    throw new UnauthorizedException();
  }

  return json.id;
});

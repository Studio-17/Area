import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BadRequestException } from '../exceptions/bad-request.exception';

export const IsUuidParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const uuid: string = request.params[data];
    if (!uuid) {
      return uuid;
    }
    const cmp = uuid.match(
      '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
    );
    if (cmp === null) {
      throw BadRequestException(data, 'uuid');
    }
    return uuid;
  },
);

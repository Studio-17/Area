import { HttpException, HttpStatus } from '@nestjs/common';

export function ConflictException(type: string): HttpException {
  return new HttpException(
    {
      status: HttpStatus.CONFLICT,
      error: type + ' already exists.',
    },
    HttpStatus.CONFLICT,
  );
}

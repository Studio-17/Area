import { HttpException, HttpStatus } from '@nestjs/common';

export function NotFoundException(type: string): HttpException {
  return new HttpException(
    {
      status: HttpStatus.NOT_FOUND,
      error: type + ' not found.',
    },
    HttpStatus.NOT_FOUND,
  );
}

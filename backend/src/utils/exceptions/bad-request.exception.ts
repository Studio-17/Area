import { HttpException, HttpStatus } from '@nestjs/common';

export function BadRequestException(idName: string, format: string): HttpException {
  return new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      error: idName + ' is not an ' + format,
    },
    HttpStatus.BAD_REQUEST,
  );
}

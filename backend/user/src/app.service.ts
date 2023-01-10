import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): string {
    return 'Welcome on AuthenticaThor Service !</br>' + new Date().toISOString();
  }
}

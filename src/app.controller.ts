import { Controller, Get , UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuardJwt } from './common/guards/auth-guard.jwt';
import { CurrentUser } from './common/decorators/current-user.decorator';
import { User } from './typeorm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuardJwt)
  getHello(@CurrentUser() user: User): string {
    return this.appService.getHello();
  }
}

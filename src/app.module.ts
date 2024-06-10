import { Module } from '@nestjs/common';
import { TrxModule } from './trx/trx.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TrxModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

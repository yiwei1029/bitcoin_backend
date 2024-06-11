import { Module } from '@nestjs/common';
import { TrxModule } from './trx/trx.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), TrxModule, UserModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

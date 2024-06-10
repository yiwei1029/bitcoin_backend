import { Body, Controller, Get, ParseIntPipe, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
    // @Get()
    // findAll(): string {
    //   return 'This action returns all users';
    // }
    constructor(private authService: AuthService) { }
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        // console.log({ dto });
        return this.authService.signup(dto);
        // return {msg:'add a new user'};  
    }
    @Post('signin')
    signin() {
        return this.authService.signin();
    }

}

import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    // @Get()
    // findAll(): string {
    //   return 'This action returns all users';
    // }
    constructor(private authService: AuthService) { }
    @Post('signup')
    signup() {
        return this.authService.signup();
        // return {msg:'add a new user'};  
    }
    @Post('signin')
    signin() {
        return this.authService.signin();
    }

}

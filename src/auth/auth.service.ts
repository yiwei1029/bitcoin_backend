import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signup() {
        return { msg: 'add a new u' };
    }
    signin() {

    }
}

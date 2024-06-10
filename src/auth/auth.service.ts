import { Injectable } from '@nestjs/common';
import { User, Transaction } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) { }
    signup() {

        return { msg: 'add a new u' };
    }
    signin() {

    }
}

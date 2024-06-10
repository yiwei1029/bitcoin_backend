import { Injectable } from '@nestjs/common';
import { User, Transaction } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) { }
    signup(dto: AuthDto) {

        return { dto: dto };
    }
    signin() {

    }
}

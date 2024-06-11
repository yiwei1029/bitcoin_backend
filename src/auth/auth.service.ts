import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Transaction } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) { }
    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    hash
                },
            })

            delete user.hash
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials already exist')
                }
            }
            throw error
        }
    }
    async signin(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            },
        })
        if (!user) {
            throw new ForbiddenException('Wrong credentials')
        }
        else if (argon.verify(user.hash, dto.password)) {
            delete user.hash
            return user
        } else {
            throw new ForbiddenException('Wrong credentials')
        }
    }
}

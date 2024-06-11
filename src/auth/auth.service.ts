import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Transaction } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwt: JwtService,
        private config: ConfigService) { }
    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    hash
                },
            })

            // delete user.hash
            return this.signToken(user.email, user.id)
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
            // delete user.hash
            return await this.signToken(user.email, user.id)
        } else {
            throw new ForbiddenException('Wrong credentials')
        }
    }
    async signToken(email: string, userId: number): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT-SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1h',
            secret: secret
        })
        return {
            access_token: token
        }
    }
}

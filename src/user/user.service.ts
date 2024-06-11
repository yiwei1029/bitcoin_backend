import { ForbiddenException, Injectable } from '@nestjs/common';
import { AddressDto } from './dto';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
        
}

import { Body, Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {

    }
    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    getMe(@Req() req: Request & { user: User }) {
        // console.log(req.user)
        return req.user
    }
}
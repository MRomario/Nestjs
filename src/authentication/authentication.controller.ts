import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthenticationDto } from './dto/authentication.credentials.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService) { }

    @Post('/singup')
    singUp(@Body(ValidationPipe) authenticationDto: AuthenticationDto): Promise<void> {
        return this.authenticationService.singUp(authenticationDto);
    }

    @Post('/singin')
    singIn(@Body(ValidationPipe) authenticationDto: AuthenticationDto) {
        return this.authenticationService.singIn(authenticationDto);
    }

}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthenticationDto } from './dto/authentication.credentials.dto';

@Injectable()
export class AuthenticationService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) { }

    async singUp(authenticationDto: AuthenticationDto): Promise<void> {

        return this.userRepository.singUp(authenticationDto);
    }

    async singIn(authenticationDto: AuthenticationDto): Promise<string> {

        const result = await this.userRepository.validateUserPassword(authenticationDto);

        if (!result) {
            throw new UnauthorizedException(`authentication failed`);
        }

        return result;

    }
}

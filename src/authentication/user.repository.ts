import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthenticationDto } from "./dto/authentication.credentials.dto";
import { UserRole } from "./dto/user.enum";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async singUp(authenticationDto: AuthenticationDto): Promise<void> {

        const { email, password } = authenticationDto;
        const salt = await bcrypt.genSalt();
        const user = new User();

        user.email = email;
        user.salt = salt;
        user.password = await this.hashPassword(password, user.salt);
        user.role = UserRole.USER;
        user.isActive = true;

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(`email already exists`);
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    async validateUserPassword(authenticationDto: AuthenticationDto): Promise<string> {

        const { email, password } = authenticationDto;
        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            return user.email;
        }
        return null;

    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}
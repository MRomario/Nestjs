import { IsString, IsEmail, MinLength, MaxLength, Matches } from "class-validator";

export class AuthenticationDto {
    
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {message: 'error password'})
    password: string;
    
}
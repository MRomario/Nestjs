import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp, Unique } from "typeorm";
import { UserRole } from "./dto/user.enum";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    role: UserRole;

    @UpdateDateColumn()
    dateAt: Timestamp;

    @CreateDateColumn()
    dateUp: Timestamp;

    @Column()
    isActive: boolean;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}
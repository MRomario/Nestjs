import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Romario1290#',
    database: 'Nest',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
};
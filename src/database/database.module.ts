import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema, UserSchema } from '../../schemas/index';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'),
        MongooseModule.forFeature([
            { name: "admin", schema: AdminSchema },
            { name: "user", schema: UserSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule { }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    profile_pic: string;

    @Prop()
    password: string;

    @Prop()
    phone_number : number = 0;

    @Prop()
    updated_at: number = 0;

    @Prop()
    created_at: number = 0;
}

export const UserSchema = SchemaFactory.createForClass(User);
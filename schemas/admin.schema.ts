import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    super_admin: boolean = false;

    @Prop()
    updated_at: number = 0;

    @Prop()
    created_at: number = 0;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
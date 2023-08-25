import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';


export class AdminDto {
    @IsOptional()
    _id?: Types.ObjectId;

    @ApiProperty({
        default: "admin@gmail.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        default: "qwerty"
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    token?: string;

    @IsOptional()
    _doc?: any;

    select? : any;
}

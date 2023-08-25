
import { Injectable, ForbiddenException, BadRequestException, Request } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, User } from '../../schemas/index';
import { AdminDto } from "./dto";
import * as argon from 'argon2';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel("admin") private readonly AdminModel: Model<Admin>,
        @InjectModel("user") private readonly UserModel: Model<User>,
        private config: ConfigService
    ) { }


    login = async (dto: AdminDto) => {
        try {
            let { email, password } = dto;
            // ! check email exists
            let admin = await this.AdminModel.find({ email: email })
            if (admin.length) {
                return await this.login_exisitng_admin(admin[0], password)
            }
            else {
                return await this.create_new_admin(dto)
            }
        }
        catch (err) {
            throw err;
        }
    }

    login_exisitng_admin = async (admin: AdminDto, password: string) => {
        try {
            let { _id, password: hash } = admin
            let decode = await argon.verify(hash, password)
            console.log(`🚀 ~ file: admin.service.ts:23 ~ AdminService ~ login ~ decode:`, decode)
            if (decode != true) {
                throw new BadRequestException(`Invalid password`)
            }
            else {
                // ! update admin
                let query = { _id: _id }
                let update = { updated_at: +new Date() }
                let options = {
                    projection: {
                        email: true,
                        updated_at: true,
                        created_at: true
                    },
                    new: true
                }
                let update_admin = await this.AdminModel.findOneAndUpdate(query, update, options)
                // ? generate token
                // let token_payload = {
                //     sub: admin.id,
                //     id: admin.id,
                //     email: admin.email,
                //     scope: this.config.get("ADMIN_SCOPE"),
                //     token_gen_at: +new Date()
                // }
                // let token = await this.auth.generate_token(token_payload)
                // console.log(`🚀 ~ file: admin.service.ts:47 ~ AdminService ~ login= ~ token:`, token)
                // update_admin["token"] = token
                return update_admin
            }
        }
        catch (err) {
            throw err;
        }
    }

    create_new_admin = async (dto: AdminDto) => {
        try {
            let { email, password } = dto;
            if (email.toLowerCase() != "admin@gmail.com") {
                throw new BadRequestException(`This email address is not registered.`)
            }
            let hash = await argon.hash(password)
            let data_to_save = {
                email: "admin@gmail.com",
                password: hash,
                super_admin: true,
                created_at: +new Date()
            }
            let create = await this.AdminModel.create(data_to_save)

            let query = { _id: create._id }
            let projection = {
                email: true,
                updated_at: true,
                created_at: true
            }
            let options = { lean : true }
            let find = await this.AdminModel.findById(query, projection, options)


            // delete admin["super_admin"]

            // console.log("🚀 ~ file: admin.service.ts:91 ~ AdminService ~ create_new_admin= ~ admin:", admin)
            // delete admin.["password"]
            // delete admin["super_admin"]
            // console.log("🚀 ~ file: admin.service.ts:91 ~ AdminService ~ create_new_admin= ~ admin:", admin)
            // // let token_payload = {
            //     sub: admin.id,
            //     id: admin.id,
            //     email: admin.email,
            //     scope: this.config.get("ADMIN_SCOPE"),
            //     token_gen_at: +new Date()
            // }
            // let token = await this.auth.generate_token(token_payload)
            // console.log(`🚀 ~ file: admin.service.ts:47 ~ AdminService ~ login= ~ token:`, token)
            // admin["token"] = token
            return find
        }
        catch (err) {
            throw err;
        }
    }

    // profile = async (req: Request) => {
    //     try {
    //         return req["user"];
    //     }
    //     catch (err) {
    //         throw new BadRequestException()
    //     }
    // }

    // logout = async (req: Request) => {
    //     try {
    //         let { id } = req["user"]
    //         await this.prisma.admin.update({
    //             where: { id: id },
    //             data: { logged_in: false }
    //         })
    //         return "Logged out successfully"
    //     }
    //     catch(err) {
    //         throw new BadRequestException()
    //     }
    // }

}
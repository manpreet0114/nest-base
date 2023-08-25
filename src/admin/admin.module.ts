import { Module } from '@nestjs/common';
// import { JwtModule } from "@nestjs/jwt";
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
    providers: [AdminService],
    controllers: [AdminController],
    exports: [AdminService]
})
export class AdminModule { }

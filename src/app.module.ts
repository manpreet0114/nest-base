import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule
    ],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AppModule { }

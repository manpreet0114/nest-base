import { Controller, Post, Body, Get, Put, Query, UseGuards, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

// ! decorator starts from @ like @Controller, @Post, etc...
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Post('login')
    login(@Body() dto: AdminDto) {
        return this.adminService.login(dto);
    }
    
    

}
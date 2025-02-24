import { Controller ,Get,Post,Body,Param,Delete, Put, UseGuards,Request} from '@nestjs/common';
import { UsersService }    from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return this.usersService.findOne(req.user.userId);
    }
    @Get()
    findAll() {
      return this.usersService.findAll();
    }
    @Get(":id")
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id:string){
        return this.usersService.findOne(id);
    }
    @Post()
    create(@Body() CreateUserDto:CreateUserDto){
        return this.usersService.create(CreateUserDto);
    }
    @Put(':id')
    update(@Param('id') id:string,@Body() updateUserDto:Partial<CreateUserDto>){
    return this.usersService.update(id,updateUserDto);
    }
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.usersService.remove(id);
    }
}

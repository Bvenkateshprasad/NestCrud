import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from './schemas/user.schema';
import { UtilsModule } from '../Utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ✅ Correctly register the model
 UtilsModule, ],  
  controllers: [UsersController],
  providers: [UsersService],
  exports:[  UsersService, 
    MongooseModule, // Export if the model is needed in another module
    ],// Ensure it is exported if used in other modules
})
export class UsersModule {}

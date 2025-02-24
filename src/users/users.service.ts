import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { ResponseHandlerService } from '../Utils/response_handler.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly responseHandler: ResponseHandlerService

) {}

    async findAll() {
        try {
            const users = await this.userModel.find().exec();
            return this.responseHandler.success(true, 'Users retrieved successfully', users, users.length);
        } catch (error) {
            return this.responseHandler.error(error, 'Failed to retrieve users');
        }
    }

    async findOne(id: string) {
        try {
            const user = await this.userModel.findById(id).exec();
            if (!user) throw new NotFoundException(`User with ID ${id} not found`);
            return this.responseHandler.success(true, 'User retrieved successfully', user);
        } catch (error) {
            return this.responseHandler.error(error, 'Error fetching user');
        }
    }

    async create(userData: CreateUserDto) {
        try {
            const newUser = new this.userModel(userData);
            return this.responseHandler.success(true, 'User created successfully', await newUser.save());
        } catch (error) {
            return this.responseHandler.error(error, 'Error creating user');
        }
    }

    async update(id: string, updateUserDto: Partial<CreateUserDto>) {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
            if (!updatedUser) throw new NotFoundException(`User with ID ${id} not found`);
            return this.responseHandler.success(true, 'User updated successfully', updatedUser);
        } catch (error) {
            return this.responseHandler.error(error, 'Error updating user');
        }
    }

    async remove(id: string) {
        try {
            const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
            if (!deletedUser) throw new NotFoundException(`User with ID ${id} not found`);
            return this.responseHandler.success(true, 'User deleted successfully', deletedUser);
        } catch (error) {
            return this.responseHandler.error(error, 'Error deleting user');
        }
    }

 
}

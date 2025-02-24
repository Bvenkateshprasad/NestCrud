import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) {}

    async register(name: string, email: string, password: string): Promise<any> {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) throw new UnauthorizedException('User already exists');

        const newUser = new this.userModel({ name, email, password });
        await newUser.save();
        return { userId: newUser._id, name: newUser.name, email: newUser.email };
    }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        const payload = { userId: user._id, email: user.email };
        return { access_token: this.jwtService.sign(payload) };
    }
}

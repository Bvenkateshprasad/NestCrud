import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResponseHandlerService } from '../Utils/response_handler.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly responseHandler: ResponseHandlerService
    ) {}

    @Post('register')
    async register(@Body() body: { name: string; email: string; password: string }) {
        try {
            const result = await this.authService.register(body.name, body.email, body.password);
            return this.responseHandler.success(true, 'User registered successfully', result);
        } catch (error) {
            return this.responseHandler.error(error, 'User registration failed');
        }
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        try {
            const result = await this.authService.login(body.email, body.password);
            return this.responseHandler.success(true, 'Login successful', result);
        } catch (error) {
            return this.responseHandler.error(error, 'Login failed');
        }
    }

    @Get('protected')
    @UseGuards(JwtAuthGuard)
    async protectedRoute(@Request() req) {
        return this.responseHandler.success(true, 'You have access', req.user);
    }
}

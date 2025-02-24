import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHandlerService {
    success(status: boolean, message: string, data: any = null, count?: number) {
        return { status, message, count, data };
    }

    error(error: any, defaultMessage: string) {
        let statusCode = 500;
        let message = defaultMessage;

        if (error instanceof HttpException) {
            statusCode = error.getStatus();
            message = error.message;
        } else if (error.code === 11000) {
            statusCode = 400;
            message = 'User with this email already exists';
        } else if (error.name === 'ValidationError') {
            statusCode = 400;
            message = error.message;
        } else if (error.name === 'CastError' || error.kind === 'ObjectId') {
            statusCode = 400;
            message = 'Invalid ID format';
        }

        if (statusCode === 404) {
            message = 'Requested resource not found';
        } else if (statusCode === 401) {
            message = 'Unauthorized access';
        } else if (statusCode === 403) {
            message = 'Forbidden: You don’t have permission to access this resource';
        } else if (statusCode === 409) {
            message = 'Conflict: Data already exists';
        } else if (statusCode === 500) {
            message = 'Internal server error. Please try again later';
        }

        return { status: false, message, statusCode };
    }
}

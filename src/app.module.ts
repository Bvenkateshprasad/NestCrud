import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsModule } from './Utils/utils.module';  // ✅ Import the new UtilsModule
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables

    MongooseModule.forRoot(process.env.MONGODB_URI||"mongodb+srv://venky:venky%40123@gptcrud.qqoap.mongodb.net/HelloVenky?retryWrites=true&w=majority&appName=GPTCrud"),
    UsersModule,
    UtilsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

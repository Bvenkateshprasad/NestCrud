import { Module } from '@nestjs/common';
import { ResponseHandlerService } from './response_handler.service';

@Module({
  providers: [ResponseHandlerService],
  exports: [ResponseHandlerService], // Export so other modules can use it
})
export class UtilsModule {}

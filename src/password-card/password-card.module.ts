import { Module } from '@nestjs/common';
import { PasswordCardService } from './password-card.service';
import { PasswordCardController } from './password-card.controller';

@Module({
  controllers: [PasswordCardController],
  providers: [PasswordCardService],
})
export class PasswordCardModule {}

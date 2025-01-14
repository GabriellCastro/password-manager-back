import { Module } from '@nestjs/common';
import { PasswordCardModule } from './password-card/password-card.module';

@Module({
  imports: [PasswordCardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

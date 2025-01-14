import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PasswordCardService, PasswordCard } from './password-card.service';

@Controller('password-card')
export class PasswordCardController {
  constructor(private readonly service: PasswordCardService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  create(@Body() card: Omit<PasswordCard, 'id'>) {
    return this.service.create(card);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() card: Partial<Omit<PasswordCard, 'id'>>,
  ) {
    return this.service.update(id, card);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.service.delete(id);
    return { message: 'Card deleted successfully' };
  }
}

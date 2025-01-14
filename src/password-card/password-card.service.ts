import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export interface PasswordCard {
  id: string;
  url: string;
  name: string;
  username: string;
  password: string;
  notes?: string;
}

@Injectable()
export class PasswordCardService {
  private passwordCards: PasswordCard[] = [];

  async getAll(): Promise<PasswordCard[]> {
    return Promise.all(
      this.passwordCards.map(
        async ({ id, url, name, username, password, notes }) => {
          const decryptedPassword = (await bcrypt.compare(password, password))
            ? password
            : '******';
          return {
            id,
            url,
            name,
            username,
            password: decryptedPassword,
            notes,
          };
        },
      ),
    );
  }

  async getById(id: string): Promise<PasswordCard> {
    const card = this.passwordCards.find((c) => c.id === id);
    if (!card) {
      throw new Error('Card not found');
    }
    const decryptedPassword = (await bcrypt.compare(
      card.password,
      card.password,
    ))
      ? card.password
      : '******';
    return { ...card, password: decryptedPassword };
  }

  async create(card: Omit<PasswordCard, 'id'>): Promise<PasswordCard> {
    const hashedPassword = await bcrypt.hash(card.password, 10);
    const newCard: PasswordCard = {
      id: uuidv4(),
      ...card,
      password: hashedPassword,
    };
    this.passwordCards.push(newCard);
    return { ...newCard, password: '******' };
  }

  async update(
    id: string,
    card: Partial<Omit<PasswordCard, 'id'>>,
  ): Promise<PasswordCard> {
    const index = this.passwordCards.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error('Card not found');
    }

    if (card.password) {
      card.password = await bcrypt.hash(card.password, 10);
    }

    this.passwordCards[index] = { ...this.passwordCards[index], ...card };
    const updatedCard = this.passwordCards[index];
    return { ...updatedCard, password: '******' };
  }

  delete(id: string): void {
    const index = this.passwordCards.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error('Card not found');
    }
    this.passwordCards.splice(index, 1);
  }
}

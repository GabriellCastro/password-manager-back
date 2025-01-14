import { Test, TestingModule } from '@nestjs/testing';
import { PasswordCardService } from './password-card.service';

describe('PasswordCardService', () => {
  let service: PasswordCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordCardService],
    }).compile();

    service = module.get<PasswordCardService>(PasswordCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new password card', async () => {
    const card = {
      url: 'http://example.com',
      name: 'Example',
      username: 'user',
      password: 'password123',
      notes: 'Some notes',
    };
    const createdCard = await service.create(card);
    expect(createdCard).toHaveProperty('id');
    expect(createdCard.password).toBe('******');
  });

  it('should get all password cards', async () => {
    const card = {
      url: 'http://example.com',
      name: 'Example',
      username: 'user',
      password: 'password123',
      notes: 'Some notes',
    };
    await service.create(card);
    const cards = await service.getAll();
    expect(cards.length).toBeGreaterThan(0);
    expect(cards[0].password).toBe('******');
  });

  it('should get a password card by ID', async () => {
    const card = {
      url: 'http://example.com',
      name: 'Example',
      username: 'user',
      password: 'password',
      notes: 'Some notes',
    };
    const createdCard = await service.create(card);
    const foundCard = await service.getById(createdCard.id);
    expect(foundCard.id).toBe(createdCard.id);
    expect(foundCard.password).toBe('******');
  });

  it('should update a password card', async () => {
    const card = {
      url: 'http://example.com',
      name: 'Example',
      username: 'user',
      password: 'password123',
      notes: 'Some notes',
    };
    const createdCard = await service.create(card);
    const updatedCard = await service.update(createdCard.id, {
      name: 'Updated Example',
    });
    expect(updatedCard.name).toBe('Updated Example');
    expect(updatedCard.password).toBe('******');
  });

  it('should delete a password card', async () => {
    const card = {
      url: 'http://example.com',
      name: 'Example',
      username: 'user',
      password: 'password123',
      notes: 'Some notes',
    };
    const createdCard = await service.create(card);
    await service.delete(createdCard.id);
    const cards = await service.getAll();
    expect(cards.length).toBe(0);
  });

  it('should throw an error if card not found for update', async () => {
    await expect(
      service.update('non-existent-id', { name: 'Test' }),
    ).rejects.toThrow('Card not found');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { IMerchantService } from '../merchant.interface';
import { MerchantRepository } from '../merchant.repository';
import { MerchantService } from '../merchant.service';

jest.mock('../merchant.repository');

describe('MerchantService', () => {
	let service: IMerchantService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IMerchantService,
					useClass: MerchantService
				},
				MerchantRepository
			]
		}).compile();

		service = module.get<IMerchantService>(IMerchantService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

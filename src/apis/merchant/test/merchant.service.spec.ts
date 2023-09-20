import { Test, TestingModule } from '@nestjs/testing';
import { MerchantRepository } from '../merchant.repository';
import { MerchantService } from '../merchant.service';

jest.mock('../merchant.repository');

describe('MerchantService', () => {
	let service: MerchantService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MerchantService, MerchantRepository]
		}).compile();

		service = module.get<MerchantService>(MerchantService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

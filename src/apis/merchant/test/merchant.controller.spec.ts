import { Test, TestingModule } from '@nestjs/testing';
import { MerchantController } from '../merchant.controller';
import { IMerchantService } from '../merchant.interface';
import { MerchantService } from '../merchant.service';

jest.mock('../merchant.service');

describe('MerchantController', () => {
	let controller: MerchantController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MerchantController],
			providers: [
				{
					provide: IMerchantService,
					useClass: MerchantService
				}
			]
		}).compile();

		controller = module.get<MerchantController>(MerchantController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

import { Test, TestingModule } from '@nestjs/testing';
import { MerchantController } from '../merchant.controller';
import { MerchantHandler } from '../merchant.handler';
import { IMerchantHandler } from '../merchant.interface';

jest.mock('../merchant.handler');

describe('MerchantController', () => {
	let controller: MerchantController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MerchantController],
			providers: [
				{
					provide: IMerchantHandler,
					useClass: MerchantHandler
				}
			]
		}).compile();

		controller = module.get<MerchantController>(MerchantController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

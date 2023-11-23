import { Test, TestingModule } from '@nestjs/testing';
import { MerchantHandler } from '../merchant.handler';
import { IMerchantHandler, IMerchantService } from '../merchant.interface';
import { MerchantService } from '../merchant.service';

jest.mock('../merchant.service');

describe('MerchantHandler', () => {
	let handler: IMerchantHandler;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IMerchantHandler,
					useClass: MerchantHandler
				},
				{
					provide: IMerchantService,
					useClass: MerchantService
				}
			]
		}).compile();

		handler = module.get<IMerchantHandler>(IMerchantHandler);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});
});

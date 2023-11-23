import { Test, TestingModule } from '@nestjs/testing';
import { AdminHandler } from '../admin.handler';
import { IAdminHandler, IAdminService } from '../admin.interface';
import { AdminService } from '../admin.service';

jest.mock('../admin.service');

describe('AdminHandler', () => {
	let handler: IAdminHandler;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IAdminHandler,
					useClass: AdminHandler
				},
				{
					provide: IAdminService,
					useClass: AdminService
				}
			]
		}).compile();

		handler = module.get<IAdminHandler>(IAdminHandler);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});
});

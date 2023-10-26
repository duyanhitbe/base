import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../admin.controller';
import { AdminHandler } from '../admin.handler';
import { IAdminHandler } from '../admin.interface';

jest.mock('../admin.handler');

describe('AdminController', () => {
	let controller: AdminController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AdminController],
			providers: [
				{
					provide: IAdminHandler,
					useClass: AdminHandler
				}
			]
		}).compile();

		controller = module.get<AdminController>(AdminController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

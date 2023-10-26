import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../application.controller';
import { ApplicationHandler } from '../application.handler';
import { IApplicationHandler } from '../application.interface';

jest.mock('../application.handler');

describe('ApplicationController', () => {
	let controller: ApplicationController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ApplicationController],
			providers: [
				{
					provide: IApplicationHandler,
					useClass: ApplicationHandler
				}
			]
		}).compile();

		controller = module.get<ApplicationController>(ApplicationController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

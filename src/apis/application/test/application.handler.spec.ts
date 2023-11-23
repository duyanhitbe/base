import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationHandler } from '../application.handler';
import { IApplicationHandler, IApplicationService } from '../application.interface';
import { ApplicationService } from '../application.service';

jest.mock('../application.service');

describe('ApplicationHandler', () => {
	let handler: IApplicationHandler;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IApplicationHandler,
					useClass: ApplicationHandler
				},
				{
					provide: IApplicationService,
					useClass: ApplicationService
				}
			]
		}).compile();

		handler = module.get<IApplicationHandler>(IApplicationHandler);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});
});

import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../application.controller';
import { IApplicationService } from '../application.interface';
import { ApplicationService } from '../application.service';

jest.mock('../application.service');

describe('ApplicationController', () => {
	let controller: ApplicationController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ApplicationController],
			providers: [
				{
					provide: IApplicationService,
					useClass: ApplicationService
				}
			]
		}).compile();

		controller = module.get<ApplicationController>(ApplicationController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

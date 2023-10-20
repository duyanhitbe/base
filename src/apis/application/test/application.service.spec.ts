import { Test, TestingModule } from '@nestjs/testing';
import { IApplicationService } from '../application.interface';
import { ApplicationRepository } from '../application.repository';
import { ApplicationService } from '../application.service';

jest.mock('../application.repository');

describe('ApplicationService', () => {
	let service: IApplicationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IApplicationService,
					useClass: ApplicationService
				},
				ApplicationRepository
			]
		}).compile();

		service = module.get<IApplicationService>(IApplicationService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationRepository } from '../application.repository';
import { ApplicationService } from '../application.service';

jest.mock('../application.repository');

describe('ApplicationService', () => {
	let service: ApplicationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ApplicationService, ApplicationRepository]
		}).compile();

		service = module.get<ApplicationService>(ApplicationService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

import { Test, TestingModule } from '@nestjs/testing';
import { AdminRepository } from '../admin.repository';
import { AdminService } from '../admin.service';

jest.mock('../admin.repository');

describe('AdminService', () => {
	let service: AdminService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AdminService, AdminRepository]
		}).compile();

		service = module.get<AdminService>(AdminService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

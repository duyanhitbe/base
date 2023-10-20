import { Test, TestingModule } from '@nestjs/testing';
import { IAdminService } from '../admin.interface';
import { AdminRepository } from '../admin.repository';
import { AdminService } from '../admin.service';

jest.mock('../admin.repository');

describe('AdminService', () => {
	let service: IAdminService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IAdminService,
					useClass: AdminService
				},
				AdminRepository
			]
		}).compile();

		service = module.get<IAdminService>(IAdminService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

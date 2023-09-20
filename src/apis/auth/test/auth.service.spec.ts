import { AdminService } from '@apis/admin/admin.service';
import { ApplicationService } from '@apis/application/application.service';
import { MerchantService } from '@apis/merchant/merchant.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

jest.mock('../../admin/admin.service');
jest.mock('../../application/application.service');
jest.mock('../../merchant/merchant.service');

describe('AuthService', () => {
	let service: AuthService;
	let jwtService: JwtService;

	beforeEach(async () => {
		jwtService = {} as JwtService;

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: JwtService,
					useValue: jwtService
				},
				AdminService,
				ApplicationService,
				MerchantService
			]
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

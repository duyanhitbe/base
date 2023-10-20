import { IAdminService } from '@apis/admin/admin.interface';
import { AdminService } from '@apis/admin/admin.service';
import { IApplicationService } from '@apis/application/application.interface';
import { ApplicationService } from '@apis/application/application.service';
import { IMerchantService } from '@apis/merchant/merchant.interface';
import { MerchantService } from '@apis/merchant/merchant.service';
import { RedisService } from '@modules';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthHelper } from '../auth.helper';
import { IAuthService } from '../auth.interface';
import { AuthService } from '../auth.service';

jest.mock('../../admin/admin.service');
jest.mock('../../application/application.service');
jest.mock('../../merchant/merchant.service');
jest.mock('../../../modules/redis/redis.service');

describe('AuthService', () => {
	let service: IAuthService;
	let jwtService: JwtService;

	beforeEach(async () => {
		jwtService = {} as JwtService;

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IAuthService,
					useClass: AuthService
				},
				{
					provide: JwtService,
					useValue: jwtService
				},
				{
					provide: IAdminService,
					useClass: AdminService
				},
				{
					provide: IApplicationService,
					useClass: ApplicationService
				},
				{
					provide: IMerchantService,
					useClass: MerchantService
				},
				AuthHelper,
				RedisService
			]
		}).compile();

		service = module.get<IAuthService>(IAuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

import { IAdminService } from '@apis/admin/admin.interface';
import { AdminService } from '@apis/admin/admin.service';
import { IApplicationService } from '@apis/application/application.interface';
import { ApplicationService } from '@apis/application/application.service';
import { IMerchantService } from '@apis/merchant/merchant.interface';
import { MerchantService } from '@apis/merchant/merchant.service';
import { RedisService } from '@modules';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthHandler } from '../auth.handler';
import { AuthHelper } from '../auth.helper';
import { IAuthHandler } from '../auth.interface';

jest.mock('../../admin/admin.service');
jest.mock('../../application/application.service');
jest.mock('../../merchant/merchant.service');
jest.mock('../../../modules/redis/redis.service');

describe('AuthHandler', () => {
	let service: IAuthHandler;
	let jwtService: JwtService;

	beforeEach(async () => {
		jwtService = {} as JwtService;

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IAuthHandler,
					useClass: AuthHandler
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

		service = module.get<IAuthHandler>(IAuthHandler);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

import { IAdminService } from '@apis/admin/admin.interface';
import { AdminService } from '@apis/admin/admin.service';
import { IApplicationService } from '@apis/application/application.interface';
import { ApplicationService } from '@apis/application/application.service';
import { IMerchantService } from '@apis/merchant/merchant.interface';
import { MerchantService } from '@apis/merchant/merchant.service';
import { RedisService } from '@modules';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthHandler } from '../auth.handler';
import { IAuthHandler, IAuthService } from '../auth.interface';
import { AuthService } from '../auth.service';

jest.mock('../auth.service');
jest.mock('../../admin/admin.service');
jest.mock('../../application/application.service');
jest.mock('../../merchant/merchant.service');
jest.mock('../../../modules/redis/redis.service');

describe('AuthHandler', () => {
	let handler: IAuthHandler;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [JwtModule.register({})],
			providers: [
				{
					provide: IAuthHandler,
					useClass: AuthHandler
				},
				{
					provide: IAuthService,
					useClass: AuthService
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
				RedisService
			]
		}).compile();

		handler = module.get<IAuthHandler>(IAuthHandler);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});
});

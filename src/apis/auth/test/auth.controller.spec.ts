import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { IAuthService } from '../auth.interface';
import { AuthService } from '../auth.service';

jest.mock('../auth.service');

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: IAuthService,
					useClass: AuthService
				}
			]
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

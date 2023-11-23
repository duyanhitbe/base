import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as packageJson from 'packageJson';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService]
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			const name = 'NestJS base';
			const version = packageJson.version;
			const env = process.env.NODE_ENV;
			expect(appController.getHello()).toBe(`${name} ${env} - v${version}`);
		});
	});
});

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import { ApplicationHandler } from './application.handler';
import { IApplicationHandler, IApplicationService } from './application.interface';
import { ApplicationRepository } from './application.repository';
import { ApplicationService } from './application.service';
import { ApplicationEntity } from './entities/application.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ApplicationEntity])],
	controllers: [ApplicationController],
	providers: [
		{
			provide: IApplicationService,
			useClass: ApplicationService
		},
		{
			provide: IApplicationHandler,
			useClass: ApplicationHandler
		},
		ApplicationRepository
	],
	exports: [IApplicationService]
})
export class ApplicationModule {}

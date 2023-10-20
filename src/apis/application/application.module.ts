import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import { IApplicationService } from './application.interface';
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
		ApplicationRepository
	],
	exports: [IApplicationService]
})
export class ApplicationModule {}

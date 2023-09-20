import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import { ApplicationRepository } from './application.repository';
import { ApplicationService } from './application.service';
import { ApplicationEntity } from './entities/application.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ApplicationEntity])],
	controllers: [ApplicationController],
	providers: [ApplicationService, ApplicationRepository],
	exports: [ApplicationService]
})
export class ApplicationModule {}

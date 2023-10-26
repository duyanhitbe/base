import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminHandler } from './admin.handler';
import { IAdminHandler, IAdminService } from './admin.interface';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminEntity } from './entities/admin.entity';

@Module({
	imports: [TypeOrmModule.forFeature([AdminEntity])],
	controllers: [AdminController],
	providers: [
		{
			provide: IAdminService,
			useClass: AdminService
		},
		{
			provide: IAdminHandler,
			useClass: AdminHandler
		},
		AdminRepository
	],
	exports: [IAdminService]
})
export class AdminModule {}

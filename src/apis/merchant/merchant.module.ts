import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantEntity } from './entities/merchant.entity';
import { MerchantController } from './merchant.controller';
import { MerchantHandler } from './merchant.handler';
import { IMerchantHandler, IMerchantService } from './merchant.interface';
import { MerchantRepository } from './merchant.repository';
import { MerchantService } from './merchant.service';

@Module({
	imports: [TypeOrmModule.forFeature([MerchantEntity])],
	controllers: [MerchantController],
	providers: [
		{
			provide: IMerchantService,
			useClass: MerchantService
		},
		{
			provide: IMerchantHandler,
			useClass: MerchantHandler
		},
		MerchantRepository
	],
	exports: [IMerchantService]
})
export class MerchantModule {}

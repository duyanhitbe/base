import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantEntity } from './entities/merchant.entity';
import { MerchantController } from './merchant.controller';
import { MerchantRepository } from './merchant.repository';
import { MerchantService } from './merchant.service';

@Module({
	imports: [TypeOrmModule.forFeature([MerchantEntity])],
	controllers: [MerchantController],
	providers: [MerchantService, MerchantRepository],
	exports: [MerchantService]
})
export class MerchantModule {}

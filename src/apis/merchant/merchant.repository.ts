import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class MerchantRepository extends Repository<MerchantEntity> {
	constructor(
		@InjectRepository(MerchantEntity) private readonly merchantRepo: Repository<MerchantEntity>
	) {
		super(merchantRepo.target, merchantRepo.manager, merchantRepo.queryRunner);
	}
}

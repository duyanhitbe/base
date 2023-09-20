import { BaseService } from '@common';
import { Injectable } from '@nestjs/common';
import { MerchantEntity } from './entities/merchant.entity';
import { MerchantRepository } from './merchant.repository';

@Injectable()
export class MerchantService extends BaseService<MerchantEntity> {
	constructor(private readonly merchantRepo: MerchantRepository) {
		super(merchantRepo);
	}
}

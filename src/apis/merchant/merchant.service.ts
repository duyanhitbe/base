import { Injectable } from '@nestjs/common';
import { IMerchantService } from './merchant.interface';
import { MerchantRepository } from './merchant.repository';

@Injectable()
export class MerchantService extends IMerchantService {
	constructor(private readonly merchantRepo: MerchantRepository) {
		super(merchantRepo);
	}
}

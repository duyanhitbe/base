import { Injectable } from '@nestjs/common';
import { IMerchantHandler, IMerchantService } from './merchant.interface';

@Injectable()
export class MerchantHandler extends IMerchantHandler {
	constructor(private readonly merchantService: IMerchantService) {
		super(merchantService);
	}
}

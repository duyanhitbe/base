import { BaseService } from '@common';
import { MerchantEntity } from './entities/merchant.entity';

export abstract class IMerchantService extends BaseService<MerchantEntity> {}

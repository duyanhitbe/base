import { BaseService } from '@common';
import { AdminEntity } from './entities/admin.entity';

export abstract class IAdminService extends BaseService<AdminEntity> {}

import { BaseHandler, BaseService } from '@common';
import { AdminEntity } from './entities/admin.entity';

export abstract class IAdminService extends BaseService<AdminEntity> {}

export abstract class IAdminHandler extends BaseHandler<AdminEntity> {}

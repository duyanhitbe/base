import { BaseHandler, BaseService } from '@common';
import { ApplicationEntity } from './entities/application.entity';

export abstract class IApplicationService extends BaseService<ApplicationEntity> {}

export abstract class IApplicationHandler extends BaseHandler<ApplicationEntity> {}

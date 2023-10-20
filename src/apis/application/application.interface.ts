import { BaseService } from '@common';
import { ApplicationEntity } from './entities/application.entity';

export abstract class IApplicationService extends BaseService<ApplicationEntity> {}

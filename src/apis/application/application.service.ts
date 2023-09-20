import { BaseService } from '@common';
import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { ApplicationEntity } from './entities/application.entity';

@Injectable()
export class ApplicationService extends BaseService<ApplicationEntity> {
	constructor(private readonly applicationRepo: ApplicationRepository) {
		super(applicationRepo);
	}
}

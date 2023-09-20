import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ApplicationRepository extends Repository<ApplicationEntity> {
	constructor(
		@InjectRepository(ApplicationEntity)
		private readonly applicationRepo: Repository<ApplicationEntity>
	) {
		super(applicationRepo.target, applicationRepo.manager, applicationRepo.queryRunner);
	}
}

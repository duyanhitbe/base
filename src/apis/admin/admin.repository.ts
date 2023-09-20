import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class AdminRepository extends Repository<AdminEntity> {
	constructor(
		@InjectRepository(AdminEntity) private readonly adminRepo: Repository<AdminEntity>
	) {
		super(adminRepo.target, adminRepo.manager, adminRepo.queryRunner);
	}
}

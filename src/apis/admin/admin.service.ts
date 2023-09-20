import { BaseService } from '@common';
import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { AdminEntity } from './entities/admin.entity';

@Injectable()
export class AdminService extends BaseService<AdminEntity> {
	constructor(private readonly adminRepo: AdminRepository) {
		super(adminRepo);
	}
}

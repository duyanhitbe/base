import { Injectable } from '@nestjs/common';
import { IAdminService } from './admin.interface';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService extends IAdminService {
	constructor(private readonly adminRepo: AdminRepository) {
		super(adminRepo);
	}
}

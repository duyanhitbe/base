import { Injectable } from '@nestjs/common';
import { IAdminHandler, IAdminService } from './admin.interface';

@Injectable()
export class AdminHandler extends IAdminHandler {
	constructor(private readonly adminService: IAdminService) {
		super(adminService);
	}
}

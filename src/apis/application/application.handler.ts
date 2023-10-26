import { Injectable } from '@nestjs/common';
import { IApplicationHandler, IApplicationService } from './application.interface';

@Injectable()
export class ApplicationHandler extends IApplicationHandler {
	constructor(private readonly applicationService: IApplicationService) {
		super(applicationService);
	}
}

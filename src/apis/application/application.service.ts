import { Injectable } from '@nestjs/common';
import { IApplicationService } from './application.interface';
import { ApplicationRepository } from './application.repository';

@Injectable()
export class ApplicationService extends IApplicationService {
	constructor(private readonly applicationRepo: ApplicationRepository) {
		super(applicationRepo);
	}
}

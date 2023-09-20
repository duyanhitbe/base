import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
	private readonly logger = new Logger(CronService.name);

	/** CronJob vào lúc 00:00 */
	@Cron('0 0 0 * * *')
	async cronJob() {
		this.logger.log('CronJob starting...');
	}
}

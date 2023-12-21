import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { MetadataKey } from '../../common/constants';
import { MailService } from './mail.service';

@Global()
@Module({
	providers: [
		MailService,
		{
			provide: MetadataKey.NODEMAILER,
			inject: [ConfigService],
			useFactory(configService: ConfigService) {
				return createTransport({
					host: configService.get<string>('MAIL_HOST'),
					from: configService.get<string>('MAIL_FROM'),
					secure: true,
					auth: {
						user: configService.get<string>('MAIL_USER'),
						pass: configService.get<string>('MAIL_PASS')
					}
				});
			}
		}
	],
	exports: [MailService]
})
export class MailModule {}

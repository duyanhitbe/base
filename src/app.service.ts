import { Injectable } from '@nestjs/common';
const packageJson = require('../../package.json');

@Injectable()
export class AppService {
	getHello(): string {
		const name = 'NestJS base';
		const version = packageJson.version;
		const env = process.env.NODE_ENV;
		return `${name} ${env} - v${version}`;
	}
}

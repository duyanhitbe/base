import { IAuthService } from '@apis/auth/auth.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class ApplicationLocalStrategy extends PassportStrategy(Strategy, 'application-local') {
	constructor(private authService: IAuthService) {
		super({
			usernameField: 'clientKey',
			passwordField: 'secretKey'
		});
	}

	async validate(clientKey: string, secretKey: string): Promise<any> {
		return this.authService.validateApplication(clientKey, secretKey);
	}
}

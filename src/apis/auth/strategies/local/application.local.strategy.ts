import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../auth.service';

@Injectable()
export class ApplicationLocalStrategy extends PassportStrategy(Strategy, 'application-local') {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'clientKey',
			passwordField: 'secretKey'
		});
	}

	async validate(clientKey: string, secretKey: string): Promise<any> {
		return this.authService.validateApplication(clientKey, secretKey);
	}
}

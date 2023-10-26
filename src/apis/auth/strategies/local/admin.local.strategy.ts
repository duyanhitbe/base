import { IAuthHandler } from '@apis/auth/auth.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy, 'admin-local') {
	constructor(private authService: IAuthHandler) {
		super({
			usernameField: 'username',
			passwordField: 'password'
		});
	}

	async validate(username: string, password: string): Promise<any> {
		return this.authService.validateAdmin(username, password);
	}
}

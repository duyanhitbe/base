import { IAuthService } from '@apis/auth/auth.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class MerchantLocalStrategy extends PassportStrategy(Strategy, 'merchant-local') {
	constructor(private authService: IAuthService) {
		super({
			usernameField: 'email',
			passwordField: 'password'
		});
	}

	async validate(email: string, password: string): Promise<any> {
		return this.authService.validateMerchant(email, password);
	}
}

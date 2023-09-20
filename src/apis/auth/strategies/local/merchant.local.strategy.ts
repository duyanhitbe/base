import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../auth.service';

@Injectable()
export class MerchantLocalStrategy extends PassportStrategy(Strategy, 'merchant-local') {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'email',
			passwordField: 'password'
		});
	}

	async validate(email: string, password: string): Promise<any> {
		return this.authService.validateMerchant(email, password);
	}
}

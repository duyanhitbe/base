import { AuthService } from '@apis/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class MerchantJwtStrategy extends PassportStrategy(Strategy, 'merchant-jwt') {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('SECRET_JWT')
		});
	}

	async validate(payload: any) {
		await this.authService.validateById(payload.id, 'merchant');
		return { merchantId: payload.id, applicationId: payload.applicationId, type: payload.type };
	}
}

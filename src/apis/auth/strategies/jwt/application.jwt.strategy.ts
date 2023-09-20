import { AuthService } from '@apis/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class ApplicationJwtStrategy extends PassportStrategy(Strategy, 'application-jwt') {
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
		await this.authService.validateById(payload.id, 'application');
		return { applicationId: payload.id, type: payload.type };
	}
}

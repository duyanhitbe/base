import { IAuthHandler } from '@apis/auth/auth.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class MerchantJwtStrategy extends PassportStrategy(Strategy, 'merchant-jwt') {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: IAuthHandler
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('SECRET_JWT'),
			passReqToCallback: true
		});
	}

	async validate(req: Request, payload: MerchantPayload) {
		const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
		if (!token) throw new UnauthorizedException('Missing token');
		await this.authService.validateToken(token, payload.id);
		await this.authService.validateById(payload.id, 'merchant');
		return { merchantId: payload.id, applicationId: payload.applicationId, type: payload.type };
	}
}

import { AuthService } from '@apis/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('SECRET_JWT'),
			passReqToCallback: true
		});
	}

	async validate(req: Request, payload: AdminPayload) {
		const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
		if (!token) throw new UnauthorizedException('Missing token');
		await this.authService.validateToken(token, payload.id);
		await this.authService.validateById(payload.id, 'admin');
		return { adminId: payload.id, type: payload.type };
	}
}

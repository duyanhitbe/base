import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ApplicationJwtAuthGuard extends AuthGuard('application-jwt') {
	handleRequest<TUser = any>(err: any, user: any): TUser {
		if (err) {
			throw new UnauthorizedException(err);
		}
		if (user.type !== 'application') {
			throw new UnauthorizedException('invalid token');
		}
		return user;
	}
}

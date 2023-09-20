import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminJwtAuthGuard extends AuthGuard('admin-jwt') {
	handleRequest<TUser = any>(err: any, user: any): TUser {
		if (err) {
			throw new UnauthorizedException(err);
		}
		if (user.type !== 'admin') {
			throw new UnauthorizedException('invalid token');
		}
		return user;
	}
}

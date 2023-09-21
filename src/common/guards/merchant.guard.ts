import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MerchantJwtAuthGuard extends AuthGuard('merchant-jwt') {
	handleRequest<TUser = any>(err: any, user: any): TUser {
		if (err) {
			throw err;
		}
		if (user.type !== 'merchant') {
			throw new UnauthorizedException('invalid token');
		}
		return user;
	}
}

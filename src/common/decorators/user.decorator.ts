import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

export const User = createParamDecorator((data: UserType, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest<Request>();
	const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
	if (!token) throw new UnauthorizedException('Missing token');

	if (data === 'admin') {
		return request.user as Admin;
	}
	if (data === 'application') {
		return request.user as Application;
	}
	if (data === 'merchant') {
		return request.user as Merchant;
	}
});

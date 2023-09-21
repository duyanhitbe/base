import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

export interface ReqUser {
	adminId: string;
	applicationId: string;
	merchantId: string;
	type: 'admin' | 'application' | 'merchant';
	token: string;
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest<Request>();
	const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
	if (!token) throw new UnauthorizedException('Missing token');
	const { type, adminId, applicationId, merchantId } = (request.user || {}) as ReqUser;

	if (type === 'admin') {
		return { adminId, type, token };
	}
	if (type === 'application') {
		return { applicationId, type, token };
	}
	if (type === 'merchant') {
		return { applicationId, merchantId, type, token };
	}
});

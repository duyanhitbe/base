import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthHelper {
	getJwtPayload(
		user: AdminEntity | ApplicationEntity | MerchantEntity,
		type: UserType
	): JWTPayload {
		let payload: JWTPayload | null = null;
		switch (type) {
			case 'admin':
				user = user as AdminEntity;
				payload = { id: user.id, type };
				break;
			case 'application':
				user = user as ApplicationEntity;
				payload = { id: user.id, type };
				break;
			case 'merchant':
				user = user as MerchantEntity;
				payload = { id: user.id, applicationId: user.applicationId, type };
				break;
		}
		if (!payload) throw new UnauthorizedException('invalid user');
		return payload;
	}

	getUserId(user: ReqUser): string {
		let id: string;
		switch (user.type) {
			case 'admin':
				id = user.adminId;
				break;
			case 'application':
				id = user.applicationId;
				break;
			case 'merchant':
				id = user.merchantId;
				break;
		}
		return id;
	}
}

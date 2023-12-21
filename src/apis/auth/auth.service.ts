import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from './auth.interface';

@Injectable()
export class AuthService extends IAuthService {
	getJwtPayload(user: User, type: UserType): JWTPayload {
		let payload: JWTPayload | null = null;
		switch (type) {
			case 'admin':
				const adminUser = user as AdminEntity;
				payload = { id: adminUser.id, type };
				break;
			case 'application':
				const applicationUser = user as ApplicationEntity;
				payload = { id: applicationUser.id, type };
				break;
			case 'merchant':
				const merchantUser = user as MerchantEntity;
				payload = {
					id: merchantUser.id,
					applicationId: merchantUser.applicationId,
					type
				};
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

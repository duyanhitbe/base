import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { ReqUser } from '@common';
import { Injectable } from '@nestjs/common';
import { UserType } from './auth.interface';

@Injectable()
export class AuthHelper {
	getJwtPayload(user: AdminEntity | ApplicationEntity | MerchantEntity, type: UserType) {
		let payload: any = {};
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
		return payload;
	}

	getUserId(user: ReqUser) {
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

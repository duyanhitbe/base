import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';

declare global {
	type Admin = {
		adminId: string;
		type: 'admin';
		token: string;
	};
	type Application = {
		applicationId: string;
		type: 'application';
		token: string;
	};
	type Merchant = {
		applicationId: string;
		merchantId: string;
		type: 'merchant';
		token: string;
	};

	type UserType = 'admin' | 'application' | 'merchant';
	type User = ApplicationEntity | AdminEntity | MerchantEntity;
	type ReqUser = Admin | Application | Merchant;
}

export {};

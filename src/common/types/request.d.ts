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
		merchantId: string;
		type: 'merchant';
		token: string;
	};

	type UserType = 'admin' | 'application' | 'merchant';

	type ReqUser = Admin | Application | Merchant;
}

export {};

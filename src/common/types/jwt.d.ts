declare global {
	type AdminPayload = {
		id: string;
		type: 'admin';
	};
	type ApplicationPayload = {
		id: string;
		type: 'application';
	};
	type MerchantPayload = {
		id: string;
		applicationId: string;
		type: 'merchant';
	};
	type JWTPayload = AdminPayload | ApplicationPayload | MerchantPayload;
}

export {};

export interface IResponse {
	status: number;
	message: string;
	data: any;
	pagination?: {
		limit: number;
		page: number;
		total: number;
	};
}

export interface IPaginationResponse<T> {
	data: T[];
	pagination: {
		limit: number;
		page: number;
		total: number;
	};
}

import { BaseEntity, FindOptions } from '@common';

export type FindWithPaginationOptions<T extends BaseEntity> = Partial<FindOptions<T>> & {
	limit?: string;
	page?: string;
	sort?: string;
};

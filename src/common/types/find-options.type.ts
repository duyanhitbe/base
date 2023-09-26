import { BaseEntity } from '@common';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

export type FindOptions<T extends BaseEntity> = {
	where: FindOptionsWhere<T> | FindOptionsWhere<T>[];
	order?: FindOptionsOrder<T>;
	relations?: string[];
	filter?: string;
};

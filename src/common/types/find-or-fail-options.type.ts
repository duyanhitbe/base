import { BaseEntity } from '@common';
import { FindOptions } from './find-options.type';

export type FindOrFailOptions<T extends BaseEntity> = FindOptions<T> & {
	errorMessage?: string;
};

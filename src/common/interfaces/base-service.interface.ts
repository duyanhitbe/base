import {
	BaseEntity,
	FindOptions,
	FindOrFailOptions,
	FindWithPaginationOptions,
	IPaginationResponse
} from '@common';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractBaseService
	implements
		ICreateService,
		IGetOneService,
		IGetAllService,
		IUpdateService,
		IRemoveService,
		ISoftRemoveService,
		ICountService
{
	abstract create(data: DeepPartial<BaseEntity>): Promise<BaseEntity>;
	abstract createMany(data: DeepPartial<BaseEntity>[]): Promise<BaseEntity[]>;

	abstract getOne(options: FindOptions<BaseEntity>): Promise<BaseEntity | null>;
	abstract getOneOrFail(options: FindOrFailOptions<BaseEntity>): Promise<BaseEntity>;

	abstract getOneById(
		id: string,
		options?: Partial<FindOptions<BaseEntity>>
	): Promise<BaseEntity | null>;
	abstract getOneByIdOrFail(
		id: string,
		options?: Partial<FindOrFailOptions<BaseEntity>>
	): Promise<BaseEntity>;

	abstract getAll(options?: Partial<FindOptions<BaseEntity>>): Promise<BaseEntity[]>;
	abstract getAllWithPagination(
		options?: FindWithPaginationOptions<BaseEntity>
	): Promise<IPaginationResponse<BaseEntity>>;
	abstract countInNumberOfDay(
		numberOfDays: number,
		options: Partial<FindOptions<BaseEntity>>
	): Promise<{
		labels: string[];
		values: number[];
	}>;
	abstract count(options: Partial<FindOptions<BaseEntity>>): Promise<number>;

	abstract update(
		options: FindOrFailOptions<BaseEntity>,
		data: QueryDeepPartialEntity<BaseEntity>
	): Promise<BaseEntity>;
	abstract updateById(
		id: string,
		data: QueryDeepPartialEntity<BaseEntity>,
		options?: Partial<FindOrFailOptions<BaseEntity>>
	): Promise<BaseEntity>;

	abstract remove(options: FindOrFailOptions<BaseEntity>): Promise<BaseEntity>;
	abstract removeById(
		id: string,
		options?: Partial<FindOrFailOptions<BaseEntity>>
	): Promise<BaseEntity>;

	abstract softRemove(options: FindOrFailOptions<BaseEntity>): Promise<BaseEntity>;
	abstract softRemoveById(
		id: string,
		options?: Partial<FindOrFailOptions<BaseEntity>>
	): Promise<BaseEntity>;
}

export interface ICreateService {
	/** Tạo một record */
	create(data: DeepPartial<BaseEntity>): Promise<BaseEntity>;
	/** Tạo nhiều record */
	createMany(data: DeepPartial<BaseEntity>[]): Promise<BaseEntity[]>;
}

export interface IGetOneService {
	/** Lấy một record */
	getOne(options: FindOptions<BaseEntity>): Promise<BaseEntity | null>;
	/** Lấy một record, nếu không tìm thấy, trả về lỗi NotFound */
	getOneOrFail(options: FindOrFailOptions<BaseEntity>): Promise<BaseEntity>;
	/** Lấy một record theo id */
	getOneById(id: string, options?: Partial<FindOptions<BaseEntity>>): Promise<BaseEntity | null>;
	/** Lấy một record theo id, nếu không tìm thấy, trả về lỗi NotFound */
	getOneByIdOrFail(
		id: string,
		options?: Partial<FindOrFailOptions<BaseEntity>>
	): Promise<BaseEntity>;
}

export interface IGetAllService {
	/** Lấy tất cả record */
	getAll(options: Partial<FindOptions<BaseEntity>>): Promise<BaseEntity[]>;
	/** Lấy tất cả record và phân trang */
	getAllWithPagination(
		options: FindWithPaginationOptions<BaseEntity>
	): Promise<IPaginationResponse<BaseEntity>>;
}

export interface IUpdateService {
	/** Cập nhật một record, nếu không tìm thấy, trả về lỗi NotFound */
	update(
		options: FindOrFailOptions<BaseEntity>,
		data: QueryDeepPartialEntity<BaseEntity>
	): Promise<BaseEntity>;
	/** Cập nhật một record theo id, nếu không tìm thấy, trả về lỗi NotFound */
	updateById(
		id: string,
		data: QueryDeepPartialEntity<BaseEntity>,
		options?: Partial<FindOrFailOptions<BaseEntity>>
	): Promise<BaseEntity>;
}

export interface IRemoveService {
	/** Xoá một record, nếu không tìm thấy, trả về lỗi NotFound */
	remove(options: FindOrFailOptions<BaseEntity>): Promise<BaseEntity>;
	/** Xoá một record theo id, nếu không tìm thấy, trả về lỗi NotFound */
	removeById(id: string, options?: Partial<FindOrFailOptions<BaseEntity>>): Promise<BaseEntity>;
}

export interface ISoftRemoveService {
	/** Xoá mềm một record, nếu không tìm thấy, trả về lỗi NotFound */
	softRemove(options: FindOrFailOptions<BaseEntity>): Promise<BaseEntity>;
	/** Xoá mềm một record theo id */
	softRemoveById(
		id: string,
		options?: Partial<FindOrFailOptions<BaseEntity>>
	): Promise<BaseEntity>;
}

export interface ICountService {
	/** Đếm record */
	count(options: Partial<FindOptions<BaseEntity>>): Promise<number>;
	/** Đếm record trong vòng numberOfDays ngày */
	countInNumberOfDay(
		numberOfDays: number,
		options: Partial<FindOptions<BaseEntity>>
	): Promise<{
		labels: string[];
		values: number[];
	}>;
}

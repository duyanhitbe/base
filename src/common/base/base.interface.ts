import { BaseEntity, GetAllQueryDto, PaginationDto } from '@common';
import { DeepPartial, SelectQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class IBaseService<T extends BaseEntity> {
	/** Tạo một record */
	abstract create(data: DeepPartial<T>): Promise<T>;
	/** Tạo nhiều record */
	abstract createMany(data: DeepPartial<T>[]): Promise<T[]>;

	/** Lấy một record */
	abstract getOne(options: FindOptions<T>): Promise<T | null>;
	/** Lấy một record, nếu không tìm thấy, trả về lỗi NotFound */
	abstract getOneOrFail(options: FindOrFailOptions<T>): Promise<T>;

	/** Lấy một record theo id */
	abstract getOneById(id: string, options?: Partial<FindOptions<T>>): Promise<T | null>;
	/** Lấy một record theo id, nếu không tìm thấy, trả về lỗi NotFound */
	abstract getOneByIdOrFail(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T>;

	/** Lấy tất cả record */
	abstract getAll(options?: Partial<FindOptions<T>>): Promise<T[]>;
	/** Lấy tất cả record và phân trang */
	abstract getAllWithPagination(options?: FindWithPaginationOptions<T>): Promise<IPaginationResponse<T>>;
	
	/** Cập nhật một record, nếu không tìm thấy, trả về lỗi NotFound */
	abstract update(options: FindOrFailOptions<T>, data: QueryDeepPartialEntity<T>): Promise<T>;
	/** Cập nhật một record theo id, nếu không tìm thấy, trả về lỗi NotFound */
	abstract updateById(id: string, data: QueryDeepPartialEntity<T>, options?: Partial<FindOrFailOptions<T>>): Promise<T>;
	/** Nếu data truyền id vào thì cập nhật, không truyền id thì tạo mới, nếu không truyền item cũ vào data thì sẽ xóa item đó */
	abstract updateMany(options: FindOrFailOptions<T>, data: (QueryDeepPartialEntity<T> & { id?: string })[]): Promise<T[]>;
	
	/** Xoá một record, nếu không tìm thấy, trả về lỗi NotFound */
	abstract remove(options: FindOrFailOptions<T>): Promise<T>;
	/** Xoá một record theo id, nếu không tìm thấy, trả về lỗi NotFound */
	abstract removeById(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T>;
	
	/** Xoá mềm một record, nếu không tìm thấy, trả về lỗi NotFound */
	abstract softRemove(options: FindOrFailOptions<T>): Promise<T>;
	/** Xoá mềm một record theo id */
	abstract softRemoveById(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T>;
	
	/** Đếm record */
	abstract count(options: Partial<FindOptions<T>>): Promise<number>;
	/** Đếm record trong vòng numberOfDays ngày */
	abstract countInNumberOfDay(numberOfDays: number, options: Partial<FindOptions<T>>): Promise<CountInNumberOfDayData>;

	abstract getQueryBuilder(alias?: string): SelectQueryBuilder<T>;
}

export abstract class IBaseHandler<T extends BaseEntity>{
	/** Tạo một record */
	abstract create(data: DeepPartial<T>): Promise<T>

	/** Lấy tất cả record và phân trang */
	abstract getAllWithPagination(query: PaginationDto): Promise<IPaginationResponse<T>>

	/** Lấy tất cả record */
	abstract getAll(query: GetAllQueryDto): Promise<T[]>

	/** Lấy một record theo id, nếu không tìm thấy, trả về lỗi NotFound */
	abstract getOneById(id: string): Promise<T>

	/** Cập nhật một record theo id, nếu không tìm thấy, trả về lỗi NotFound */
	abstract updateById(id: string, data: QueryDeepPartialEntity<T>): Promise<T>

	/** Xoá mềm một record theo id */
	abstract removeById(id: string): Promise<T>
}
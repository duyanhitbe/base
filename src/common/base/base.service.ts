/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
	BaseEntity,
	FindOptions,
	FindOrFailOptions,
	FindWithPaginationOptions,
	IPaginationResponse
} from '@common';
import { NotFoundException } from '@nestjs/common';
import { extend, omit } from 'lodash';
import {
	And,
	DeepPartial,
	FindOptionsWhere,
	ILike,
	LessThan,
	LessThanOrEqual,
	Like,
	MoreThanOrEqual,
	Repository
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AbstractBaseService } from '../interfaces/base-service.interface';

export class BaseService<T extends BaseEntity> extends AbstractBaseService {
	constructor(private readonly repository: Repository<T>) {
		super();
	}

	create(data: DeepPartial<T>): Promise<T> {
		return this.repository.create(data).save();
	}

	async createMany(data: DeepPartial<T>[]): Promise<T[]> {
		const result: T[] = [];
		for (let i = 0; i < data.length; i++) {
			const newEntity = await this.create(data[i]);
			result.push(newEntity);
		}
		return result;
	}

	getOne(options: FindOptions<T>): Promise<T | null> {
		const { relations, loadEagerRelations } = options;
		const where = options.where || {};
		const filter = JSON.parse(options.filter || '{}');
		for (const field in filter) {
			where[field] = Like(`%${filter[field]}%`);
		}
		return this.repository.findOne({ where, relations, loadEagerRelations });
	}

	async getOneOrFail(options: FindOrFailOptions<T>): Promise<T> {
		const { relations, errorMessage, loadEagerRelations } = options;
		const where = options.where || {};
		const filter = JSON.parse(options.filter || '{}');
		for (const field in filter) {
			where[field] = Like(`%${filter[field]}%`);
		}
		const entity = await this.repository.findOne({ where, relations, loadEagerRelations });
		if (!entity) {
			throw new NotFoundException(errorMessage || 'Entity not found');
		}
		return entity;
	}

	getOneById(id: string, options?: Partial<FindOptions<T>>): Promise<T | null> {
		const where = { id } as FindOptionsWhere<T>;
		return this.repository.findOne({ ...options, where });
	}

	async getOneByIdOrFail(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const where = { id } as FindOptionsWhere<T>;
		const errorMessage = options?.errorMessage || 'Entity not found';
		omit(options, ['errorMessage']);
		const entity = await this.repository.findOne({ ...options, where });
		if (!entity) {
			throw new NotFoundException(errorMessage);
		}
		return entity;
	}

	getAll(options: Partial<FindOptions<T>>): Promise<T[]> {
		const { relations, order, loadEagerRelations } = options;
		const where = options.where || {};
		const filter = JSON.parse(options.filter || '{}');
		for (const field in filter) {
			where[field] = Like(`%${filter[field]}%`);
		}
		return this.repository.find({
			where,
			relations,
			order,
			loadEagerRelations
		});
	}

	async getAllWithPagination(
		options: FindWithPaginationOptions<T>
	): Promise<IPaginationResponse<T>> {
		const loadEagerRelations = options.loadEagerRelations;
		const where = options.where || [];
		const filter = JSON.parse(options.filter || '{}');
		const order = JSON.parse(options.sort || '{}');
		const relations = options.relations;
		const limit = +(options.limit || 10);
		const page = +(options.page || 1);
		const take = limit;
		const skip = limit * (+page - 1);

		this.setWhereGetAllWithPagination(where, filter);

		const findAndCountOptions = { where, order, relations, take, skip, loadEagerRelations };
		const [data, total] = await this.repository.findAndCount(findAndCountOptions);

		return {
			data,
			pagination: {
				limit,
				page,
				total
			}
		};
	}

	private setWhereGetAllWithPagination(
		where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
		filter: any
	) {
		let from, to;

		for (const field in filter) {
			if (field === 'from') {
				from = MoreThanOrEqual(filter[field]);
			} else if (field === 'to') {
				to = LessThanOrEqual(filter[field]);
			} else if (typeof filter[field] === 'boolean') {
				where[field] = filter[field];
			} else {
				where[field] = ILike(`%${filter[field]}%`);
			}
		}

		if (from && !to) {
			where['createdAt'] = from;
		}

		if (!from && to) {
			where['createdAt'] = to;
		}

		if (from && to) {
			where['createdAt'] = And(from, to);
		}
	}

	async update(options: FindOrFailOptions<T>, data: QueryDeepPartialEntity<T>): Promise<T> {
		const entity = await this.getOneOrFail(options);
		const newEntity = extend<T>(entity, data);
		return newEntity.save();
	}

	/** Cập nhật hàng loạt */
	async updateMany(
		options: FindOrFailOptions<T>,
		data: (QueryDeepPartialEntity<T> & { id?: string })[]
	): Promise<T[]> {
		const where = options.where;
		const result: T[] = [];
		if (data.length === 0) {
			await this.softRemove({ where });
			return [];
		}
		/** Danh sách cần cập nhật */
		const listEntityShouldUpdate: any[] = [];
		/** Danh sách cần xóa */
		const listEntityShouldDelete: T[] = [];

		for (let i = 0; i < data.length; i++) {
			const dto = data[i];

			/** Tạo */
			if (!Boolean(dto.id)) {
				const newEntity = await this.create(dto as any);
				result.push(newEntity);
				listEntityShouldUpdate.push(newEntity);
			}

			/** Cập nhật */
			if (Boolean(dto.id)) {
				const updatedEntity = await this.updateById(dto.id || '', dto);
				listEntityShouldUpdate.push(dto);
				result.push(updatedEntity);
			}
		}

		if (listEntityShouldUpdate.length > 0) {
			const listEntityIdShouldUpdate = listEntityShouldUpdate.map((item) => item.id);
			/** Danh sách hiện tại */
			const oldEntities = await this.getAll({ where });
			/** Tìm kiếm những cần phải xóa */
			oldEntities.forEach((entity) => {
				if (!listEntityIdShouldUpdate.includes(entity.id)) {
					listEntityShouldDelete.push(entity);
				}
			});
			/** Xóa */
			await Promise.all(
				listEntityShouldDelete.map((entityShouldDelete) =>
					this.softRemoveById(entityShouldDelete.id || '')
				)
			);
		}

		return result;
	}

	async updateById(
		id: string,
		data: QueryDeepPartialEntity<T>,
		options?: Partial<FindOrFailOptions<T>>
	): Promise<T> {
		const entity = await this.getOneByIdOrFail(id, options);
		const newEntity = extend<T>(entity, data);
		return newEntity.save();
	}

	async remove(options: FindOrFailOptions<T>): Promise<T> {
		const entity = await this.getOneOrFail(options);
		return this.repository.remove(entity);
	}

	async removeById(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const entity = await this.getOneByIdOrFail(id, options);
		return this.repository.remove(entity);
	}

	async softRemove(options: FindOrFailOptions<T>): Promise<T> {
		const entity = await this.getOneOrFail(options);
		return this.repository.softRemove(entity);
	}

	async softRemoveById(id: string, options?: Partial<FindOrFailOptions<T>>): Promise<T> {
		const entity = await this.getOneByIdOrFail(id, options);
		return this.repository.softRemove(entity);
	}

	async count(options: Partial<FindOptions<T>>) {
		return this.repository.count(options);
	}

	async countInNumberOfDay(numberOfDays: number, options: Partial<FindOptions<T>>) {
		const today = new Date();
		const startDate = new Date(today);
		startDate.setDate(startDate.getDate() - numberOfDays);

		const labels: string[] = [];
		const values: number[] = [];

		for (let date = new Date(startDate); date <= today; date.setDate(date.getDate() + 1)) {
			const nextDate = new Date(date);
			nextDate.setDate(nextDate.getDate() + 1);

			//@ts-ignore
			const where: FindOptionsWhere<T> = {
				...options.where,
				createdAt: And(MoreThanOrEqual(date), LessThan(nextDate))
			};
			const count = await this.count({
				...options,
				where
			});

			labels.push(date.toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' }));
			values.push(count);
		}
		return {
			labels,
			values
		};
	}

	getQueryBuilder(alias?: string) {
		return this.repository.createQueryBuilder(alias);
	}
}

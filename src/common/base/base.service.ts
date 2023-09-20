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
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
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
		const newEntities = this.repository.create(data);
		return Promise.all(newEntities.map((entity) => entity.save()));
	}

	getOne(options: FindOptions<T>): Promise<T | null> {
		const { where, relations } = options;
		return this.repository.findOne({ where, relations });
	}

	async getOneOrFail(options: FindOrFailOptions<T>): Promise<T> {
		const { where, relations, errorMessage } = options;
		const entity = await this.repository.findOne({ where, relations });
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
		const { where, relations, order } = options;
		return this.repository.find({
			where,
			relations,
			order
		});
	}

	async getAllWithPagination(
		options: FindWithPaginationOptions<T>
	): Promise<IPaginationResponse<T>> {
		const { where, relations, sort } = options;
		const limit = +(options.limit || 10);
		const page = +(options.page || 1);
		const take = limit;
		const skip = limit * (+page - 1);
		const [data, total] = await this.repository.findAndCount({
			where,
			order: JSON.parse(sort || '{}'),
			relations,
			take,
			skip
		});
		return {
			data,
			pagination: {
				limit,
				page,
				total
			}
		};
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
		/** Danh sách cần tạo mới */
		const listEntityShouldCreate = data.filter((item) => !Boolean(item.id));
		/** Danh sách cần cập nhật */
		const listEntityShouldUpdate = data.filter((item) => Boolean(item.id));
		const listEntityIdShouldUpdate = listEntityShouldUpdate.map((item) => item.id);
		/** Danh sách cần xóa */
		const listEntityShouldDelete: T[] = [];

		/** Danh sách hiện tại */
		const oldEntities = await this.getAll({ where });
		/** Tìm kiếm những cần phải xóa */
		oldEntities.forEach((entity) => {
			if (!listEntityIdShouldUpdate.includes(entity.id)) {
				listEntityShouldDelete.push(entity);
			}
		});

		/** Tạo mới */
		const newEntities = await this.createMany(listEntityShouldCreate as any);
		result.push(...newEntities);

		/** Cập nhật */
		const updatedEntities = await Promise.all(
			listEntityShouldUpdate.map((entityShouldUpdate) =>
				this.updateById(entityShouldUpdate.id || '', entityShouldUpdate)
			)
		);
		result.push(...updatedEntities);

		/** Xóa */
		await Promise.all(
			listEntityShouldDelete.map((entityShouldDelete) =>
				this.softRemoveById(entityShouldDelete.id || '')
			)
		);

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

	async removeById(id: string, errorMessage?: string): Promise<T> {
		const entity = await this.getOneByIdOrFail(id, { errorMessage });
		return this.repository.remove(entity);
	}

	async softRemove(options: FindOrFailOptions<T>): Promise<T> {
		const entity = await this.getOneOrFail(options);
		return this.repository.softRemove(entity);
	}

	async softRemoveById(id: string, errorMessage?: string): Promise<T> {
		const entity = await this.getOneByIdOrFail(id, { errorMessage });
		return this.repository.softRemove(entity);
	}

	async count(options: Partial<FindOptions<T>>) {
		return this.repository.count(options);
	}

	getQueryBuilder(alias?: string) {
		return this.repository.createQueryBuilder(alias);
	}
}

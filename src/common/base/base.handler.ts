import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GetAllQueryDto, PaginationDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';

export class BaseHandler<T extends BaseEntity> {
	constructor(private readonly service: BaseService<T>) {}

	create(data: DeepPartial<T>) {
		return this.service.create(data);
	}

	getAllWithPagination(query: PaginationDto) {
		this.service.getAllWithPagination(query);
	}

	getAll(query: GetAllQueryDto) {
		return this.service.getAll({
			...query,
			order: query.sort ? JSON.parse(query.sort) : {}
		});
	}

	getOneById(id: string) {
		return this.service.getOneById(id);
	}

	updateById(id: string, data: QueryDeepPartialEntity<T>) {
		return this.service.updateById(id, data);
	}

	removeById(id: string) {
		return this.service.softRemoveById(id);
	}
}

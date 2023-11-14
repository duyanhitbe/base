import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GetAllQueryDto, PaginationDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { IBaseHandler } from './base.interface';
import { BaseService } from './base.service';

export class BaseHandler<T extends BaseEntity> extends IBaseHandler<T> {
	constructor(private readonly service: BaseService<T>) {
		super();
	}

	create(data: DeepPartial<T>) {
		return this.service.create(data);
	}

	getAllWithPagination(query: PaginationDto) {
		return this.service.getAllWithPagination(query);
	}

	getAll(query: GetAllQueryDto) {
		return this.service.getAll({
			...query,
			order: query.sort ? JSON.parse(query.sort) : {}
		});
	}

	getOneById(id: string) {
		return this.service.getOneByIdOrFail(id);
	}

	updateById(id: string, data: QueryDeepPartialEntity<T>) {
		return this.service.updateById(id, data);
	}

	removeById(id: string) {
		return this.service.softRemoveById(id);
	}
}

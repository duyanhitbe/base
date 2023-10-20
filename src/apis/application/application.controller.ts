import {
	ApiCreate,
	ApiDelete,
	ApiGetAll,
	ApiGetOne,
	ApiUpdate,
	GetAllQueryDto,
	PaginationDto,
	UseAdminGuard,
	UseApplicationGuard,
	User
} from '@common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IApplicationService } from './application.interface';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationEntity } from './entities/application.entity';

@Controller('application')
@ApiTags('Application API')
export class ApplicationController {
	constructor(private readonly applicationService: IApplicationService) {}

	@Post()
	@UseAdminGuard()
	@ApiCreate(ApplicationEntity, 'Application')
	create(@Body() createApplicationDto: CreateApplicationDto) {
		return this.applicationService.create(createApplicationDto);
	}

	@Get()
	@UseAdminGuard()
	@ApiGetAll(ApplicationEntity, 'Application')
	getAll(@Query() query: PaginationDto) {
		return this.applicationService.getAllWithPagination(query);
	}

	@Get(':id')
	@UseAdminGuard()
	@ApiGetOne(ApplicationEntity, 'Application')
	@ApiParam({ name: 'id', description: 'Truyền all nếu muốn lấy tất cả' })
	getOne(@Param('id') id: string, @Query() query: GetAllQueryDto) {
		if (id === 'all') {
			return this.applicationService.getAll({
				...query,
				order: query.sort ? JSON.parse(query.sort) : {}
			});
		}
		return this.applicationService.getOneById(id);
	}

	@Patch(':id')
	@UseAdminGuard()
	@ApiUpdate(ApplicationEntity, 'Application')
	update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
		return this.applicationService.updateById(id, updateApplicationDto);
	}

	@Delete(':id')
	@UseAdminGuard()
	@ApiDelete(ApplicationEntity, 'Application')
	remove(@Param('id') id: string) {
		return this.applicationService.softRemoveById(id);
	}

	@Get('/info/me')
	@UseApplicationGuard()
	@ApiGetOne(ApplicationEntity, 'Application')
	getMe(@User('application') user: Application) {
		return this.applicationService.getOneByIdOrFail(user.applicationId);
	}
}

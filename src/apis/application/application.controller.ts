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
import { ApiParam } from '@nestjs/swagger';
import { IApplicationHandler } from './application.interface';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationEntity } from './entities/application.entity';

@Controller('application')
export class ApplicationController {
	constructor(private readonly applicationHandler: IApplicationHandler) {}

	@Post()
	@UseAdminGuard()
	@ApiCreate(ApplicationEntity, 'Application')
	create(@Body() createApplicationDto: CreateApplicationDto) {
		return this.applicationHandler.create(createApplicationDto);
	}

	@Get()
	@UseAdminGuard()
	@ApiGetAll(ApplicationEntity, 'Application')
	getAll(@Query() query: PaginationDto) {
		return this.applicationHandler.getAllWithPagination(query);
	}

	@Get(':id')
	@UseAdminGuard()
	@ApiGetOne(ApplicationEntity, 'Application')
	@ApiParam({ name: 'id', description: 'Truyền all nếu muốn lấy tất cả' })
	getOne(@Param('id') id: string, @Query() query: GetAllQueryDto) {
		if (id === 'all') {
			return this.applicationHandler.getAll(query);
		}
		return this.applicationHandler.getOneById(id);
	}

	@Patch(':id')
	@UseAdminGuard()
	@ApiUpdate(ApplicationEntity, 'Application')
	update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
		return this.applicationHandler.updateById(id, updateApplicationDto);
	}

	@Delete(':id')
	@UseAdminGuard()
	@ApiDelete(ApplicationEntity, 'Application')
	remove(@Param('id') id: string) {
		return this.applicationHandler.removeById(id);
	}

	@Get('/info/me')
	@UseApplicationGuard()
	@ApiGetOne(ApplicationEntity, 'Application')
	getMe(@User('application') user: Application) {
		return this.applicationHandler.getOneById(user.applicationId);
	}
}

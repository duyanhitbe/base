import {
	ApiCreate,
	ApiDelete,
	ApiGetAll,
	ApiGetOne,
	ApiUpdate,
	PaginationDto,
	UseAdminGuard
} from '@common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationEntity } from './entities/application.entity';

@Controller('application')
@ApiTags('Application API')
@UseAdminGuard()
export class ApplicationController {
	constructor(private readonly applicationService: ApplicationService) {}

	@Post()
	@ApiCreate(ApplicationEntity, 'application')
	create(@Body() createApplicationDto: CreateApplicationDto) {
		return this.applicationService.create(createApplicationDto);
	}

	@Get()
	@ApiGetAll(ApplicationEntity, 'application')
	getAll(@Query() query: PaginationDto) {
		return this.applicationService.getAllWithPagination(query);
	}

	@Get(':id')
	@ApiGetOne(ApplicationEntity, 'application')
	getOne(@Param('id') id: string) {
		return this.applicationService.getOneById(id);
	}

	@Patch(':id')
	@ApiUpdate(ApplicationEntity, 'application')
	update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
		return this.applicationService.updateById(id, updateApplicationDto);
	}

	@Delete(':id')
	@ApiDelete(ApplicationEntity, 'application')
	remove(@Param('id') id: string) {
		return this.applicationService.softRemoveById(id);
	}
}

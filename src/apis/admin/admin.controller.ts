import {
	ApiCreate,
	ApiDelete,
	ApiGetAll,
	ApiGetOne,
	ApiUpdate,
	GetAllQueryDto,
	PaginationDto,
	UseAdminGuard,
	User
} from '@common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { IAdminHandler } from './admin.interface';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminEntity } from './entities/admin.entity';

@Controller('admin')
@ApiTags('Admin API')
@UseAdminGuard()
export class AdminController {
	constructor(private readonly adminHandler: IAdminHandler) {}

	@Post()
	@ApiCreate(AdminEntity, 'Admin')
	create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminHandler.create(createAdminDto);
	}

	@Get()
	@ApiGetAll(AdminEntity, 'Admin')
	getAll(@Query() query: PaginationDto) {
		return this.adminHandler.getAllWithPagination(query);
	}

	@Get(':id')
	@ApiGetOne(AdminEntity, 'Admin')
	@ApiParam({ name: 'id', description: 'Truyền all nếu muốn lấy tất cả' })
	getOne(@Param('id') id: string, @Query() query: GetAllQueryDto) {
		if (id === 'all') {
			return this.adminHandler.getAll(query);
		}
		return this.adminHandler.getOneById(id);
	}

	@Patch(':id')
	@ApiUpdate(AdminEntity, 'Admin')
	update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
		return this.adminHandler.updateById(id, updateAdminDto);
	}

	@Delete(':id')
	@ApiDelete(AdminEntity, 'Admin')
	remove(@Param('id') id: string) {
		return this.adminHandler.removeById(id);
	}

	@Get('/info/me')
	@ApiOperation({ summary: 'Lấy thông tin admin đang đăng nhập' })
	@ApiOkResponse({ schema: { $ref: getSchemaPath(AdminEntity) } })
	getMe(@User('admin') user: Admin) {
		return this.adminHandler.getOneById(user.adminId);
	}
}

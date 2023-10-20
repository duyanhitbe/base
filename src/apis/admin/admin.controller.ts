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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminEntity } from './entities/admin.entity';

@Controller('admin')
@ApiTags('Admin API')
@UseAdminGuard()
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post()
	@ApiCreate(AdminEntity, 'admin')
	create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminService.create(createAdminDto);
	}

	@Get()
	@ApiGetAll(AdminEntity, 'admin')
	getAll(@Query() query: PaginationDto) {
		return this.adminService.getAllWithPagination(query);
	}

	@Get(':id')
	@ApiGetOne(AdminEntity, 'admin')
	@ApiParam({ name: 'id', description: 'Truyền all nếu muốn lấy tất cả' })
	getOne(
		@Param('id')
		id: string,
		@Query() query: GetAllQueryDto
	) {
		if (id === 'all') {
			return this.adminService.getAll({
				...query,
				order: query.sort ? JSON.parse(query.sort) : {}
			});
		}
		return this.adminService.getOneById(id);
	}

	@Patch(':id')
	@ApiUpdate(AdminEntity, 'admin')
	update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
		return this.adminService.updateById(id, updateAdminDto);
	}

	@Delete(':id')
	@ApiDelete(AdminEntity, 'admin')
	remove(@Param('id') id: string) {
		return this.adminService.softRemoveById(id);
	}

	@Get('/info/me')
	@ApiOperation({ summary: 'Lấy thông tin admin đang đăng nhập' })
	@ApiOkResponse({ schema: { $ref: getSchemaPath(AdminEntity) } })
	getMe(@User('admin') user: Admin) {
		return this.adminService.getOneByIdOrFail(user.adminId);
	}
}

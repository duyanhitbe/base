import {
	ApiCreate,
	ApiDelete,
	ApiGetAll,
	ApiGetOne,
	ApiUpdate,
	GetAllQueryDto,
	PaginationDto,
	ReqUser,
	UseApplicationGuard,
	UseMerchantGuard,
	User
} from '@common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantEntity } from './entities/merchant.entity';
import { MerchantService } from './merchant.service';

@Controller('merchant')
@ApiTags('Merchant API')
export class MerchantController {
	constructor(private readonly merchantService: MerchantService) {}

	@Post()
	@UseApplicationGuard()
	@ApiCreate(MerchantEntity, 'merchant')
	create(@Req() req: Request, @Body() createMerchantDto: CreateMerchantDto) {
		/** Bao gồm applicationId và type */
		const jwtPayload = req.user || {};
		createMerchantDto['applicationId'] = jwtPayload['applicationId'];
		return this.merchantService.create(createMerchantDto);
	}

	@Get()
	@UseApplicationGuard()
	@ApiGetAll(MerchantEntity, 'merchant')
	getAll(@Query() query: PaginationDto) {
		return this.merchantService.getAllWithPagination(query);
	}

	@Get(':id')
	@UseApplicationGuard()
	@ApiGetOne(MerchantEntity, 'merchant')
	@ApiParam({ name: 'id', description: 'Truyền all nếu muốn lấy tất cả' })
	getOne(@Param('id') id: string, @Query() query: GetAllQueryDto) {
		if (id === 'all') {
			return this.merchantService.getAll({
				...query,
				order: query.sort ? JSON.parse(query.sort) : {}
			});
		}
		return this.merchantService.getOneById(id);
	}

	@Patch(':id')
	@UseApplicationGuard()
	@ApiUpdate(MerchantEntity, 'merchant')
	update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
		return this.merchantService.updateById(id, updateMerchantDto);
	}

	@Delete(':id')
	@UseApplicationGuard()
	@ApiDelete(MerchantEntity, 'merchant')
	remove(@Param('id') id: string) {
		return this.merchantService.softRemoveById(id);
	}

	@Get('/info/me')
	@UseMerchantGuard()
	@ApiOperation({ summary: 'Lấy thông tin merchant đang đăng nhập' })
	@ApiOkResponse({ schema: { $ref: getSchemaPath(MerchantEntity) } })
	getMe(@User() user: ReqUser) {
		return this.merchantService.getOneByIdOrFail(user.merchantId);
	}
}

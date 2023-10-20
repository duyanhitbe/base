import {
	ApiCreate,
	ApiDelete,
	ApiGetAll,
	ApiGetOne,
	ApiUpdate,
	GetAllQueryDto,
	PaginationDto,
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
import { IMerchantService } from './merchant.interface';

@Controller('merchant')
@ApiTags('Merchant API')
export class MerchantController {
	constructor(private readonly merchantService: IMerchantService) {}

	@Post()
	@UseApplicationGuard()
	@ApiCreate(MerchantEntity, 'Merchant')
	create(@Req() req: Request, @Body() createMerchantDto: CreateMerchantDto) {
		/** Bao gồm applicationId và type */
		const jwtPayload = req.user || {};
		createMerchantDto['applicationId'] = jwtPayload['applicationId'];
		return this.merchantService.create(createMerchantDto);
	}

	@Get()
	@UseApplicationGuard()
	@ApiGetAll(MerchantEntity, 'Merchant')
	getAll(@Query() query: PaginationDto) {
		return this.merchantService.getAllWithPagination(query);
	}

	@Get(':id')
	@UseApplicationGuard()
	@ApiGetOne(MerchantEntity, 'Merchant')
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
	@ApiUpdate(MerchantEntity, 'Merchant')
	update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
		return this.merchantService.updateById(id, updateMerchantDto);
	}

	@Delete(':id')
	@UseApplicationGuard()
	@ApiDelete(MerchantEntity, 'Merchant')
	remove(@Param('id') id: string) {
		return this.merchantService.softRemoveById(id);
	}

	@Get('/info/me')
	@UseMerchantGuard()
	@ApiOperation({ summary: 'Lấy thông tin merchant đang đăng nhập' })
	@ApiOkResponse({ schema: { $ref: getSchemaPath(MerchantEntity) } })
	getMe(@User('merchant') user: Merchant) {
		return this.merchantService.getOneByIdOrFail(user.merchantId);
	}
}

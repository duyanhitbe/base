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
import { ApiOkResponse, ApiOperation, ApiParam, getSchemaPath } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantEntity } from './entities/merchant.entity';
import { IMerchantHandler } from './merchant.interface';

@Controller('merchant')
export class MerchantController {
	constructor(private readonly merchantHandler: IMerchantHandler) {}

	@Post()
	@UseApplicationGuard()
	@ApiCreate(MerchantEntity, 'Merchant')
	create(@Req() req: Request, @Body() createMerchantDto: CreateMerchantDto) {
		/** Bao gồm applicationId và type */
		const jwtPayload = req.user || {};
		createMerchantDto['applicationId'] = jwtPayload['applicationId'];
		return this.merchantHandler.create(createMerchantDto);
	}

	@Get()
	@UseApplicationGuard()
	@ApiGetAll(MerchantEntity, 'Merchant')
	getAll(@Query() query: PaginationDto) {
		return this.merchantHandler.getAllWithPagination(query);
	}

	@Get(':id')
	@UseApplicationGuard()
	@ApiGetOne(MerchantEntity, 'Merchant')
	@ApiParam({ name: 'id', description: 'Truyền all nếu muốn lấy tất cả' })
	getOne(@Param('id') id: string, @Query() query: GetAllQueryDto) {
		if (id === 'all') {
			return this.merchantHandler.getAll(query);
		}
		return this.merchantHandler.getOneById(id);
	}

	@Patch(':id')
	@UseApplicationGuard()
	@ApiUpdate(MerchantEntity, 'Merchant')
	update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
		return this.merchantHandler.updateById(id, updateMerchantDto);
	}

	@Delete(':id')
	@UseApplicationGuard()
	@ApiDelete(MerchantEntity, 'Merchant')
	remove(@Param('id') id: string) {
		return this.merchantHandler.removeById(id);
	}

	@Get('/info/me')
	@UseMerchantGuard()
	@ApiOperation({ summary: 'Lấy thông tin merchant đang đăng nhập' })
	@ApiOkResponse({ schema: { $ref: getSchemaPath(MerchantEntity) } })
	getMe(@User('merchant') user: Merchant) {
		return this.merchantHandler.getOneById(user.merchantId);
	}
}

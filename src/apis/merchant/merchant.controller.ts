import {
	ApiCreate,
	ApiDelete,
	ApiGetAll,
	ApiGetOne,
	ApiUpdate,
	PaginationDto,
	UseApplicationGuard
} from '@common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantEntity } from './entities/merchant.entity';
import { MerchantService } from './merchant.service';

@Controller('merchant')
@ApiTags('Merchant API')
@UseApplicationGuard()
export class MerchantController {
	constructor(private readonly merchantService: MerchantService) {}

	@Post()
	@ApiCreate(MerchantEntity, 'merchant')
	create(@Req() req: Request, @Body() createMerchantDto: CreateMerchantDto) {
		/** Bao gồm applicationId và type */
		const jwtPayload = req.user || {};
		createMerchantDto['applicationId'] = jwtPayload['applicationId'];
		return this.merchantService.create(createMerchantDto);
	}

	@Get()
	@ApiGetAll(MerchantEntity, 'merchant')
	getAll(@Query() query: PaginationDto) {
		return this.merchantService.getAllWithPagination(query);
	}

	@Get(':id')
	@ApiGetOne(MerchantEntity, 'merchant')
	getOne(@Param('id') id: string) {
		return this.merchantService.getOneById(id);
	}

	@Patch(':id')
	@ApiUpdate(MerchantEntity, 'merchant')
	update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
		return this.merchantService.updateById(id, updateMerchantDto);
	}

	@Delete(':id')
	@ApiDelete(MerchantEntity, 'merchant')
	remove(@Param('id') id: string) {
		return this.merchantService.softRemoveById(id);
	}
}

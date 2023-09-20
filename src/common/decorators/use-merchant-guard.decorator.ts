import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { MerchantJwtAuthGuard } from '../guards/merchant.guard';

export const UseMerchantGuard = () =>
	applyDecorators(
		UseGuards(MerchantJwtAuthGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: 'Thiếu hoặc sai token' })
	);

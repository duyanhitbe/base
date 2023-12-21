import { MerchantJwtAuthGuard } from '@common';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const UseMerchantGuard = () =>
	applyDecorators(
		UseGuards(MerchantJwtAuthGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: 'Thiếu hoặc sai token' })
	);

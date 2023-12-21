import { AdminJwtAuthGuard } from '@common';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const UseAdminGuard = () =>
	applyDecorators(
		UseGuards(AdminJwtAuthGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: 'Thiếu hoặc sai token' })
	);

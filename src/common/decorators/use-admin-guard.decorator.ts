import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AdminJwtAuthGuard } from '../guards/admin.guard';

export const UseAdminGuard = () =>
	applyDecorators(
		UseGuards(AdminJwtAuthGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: 'Thiếu hoặc sai token' })
	);

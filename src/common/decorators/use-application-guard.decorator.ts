import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApplicationJwtAuthGuard } from '../guards/application.guard';

export const UseApplicationGuard = () =>
	applyDecorators(
		UseGuards(ApplicationJwtAuthGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: 'Thiếu hoặc sai token' })
	);

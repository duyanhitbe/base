import { getBaseProperties } from '@common';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiGenerateToken = (type: UserType) =>
	applyDecorators(
		ApiOperation({ summary: `Generate token cho ${type}` }),
		ApiOkResponse({
			schema: {
				properties: {
					...getBaseProperties(200),
					data: {
						properties: {
							accessToken: { example: 'string' }
						}
					}
				}
			}
		})
	);

export const ApiLogout = (type: UserType) =>
	applyDecorators(
		ApiOperation({ summary: `Đăng xuất ${type}` }),
		ApiOkResponse({
			schema: {
				properties: {
					...getBaseProperties(200),
					data: {
						properties: {
							success: { example: true }
						}
					}
				}
			}
		})
	);

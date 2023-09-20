import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	getSchemaPath
} from '@nestjs/swagger';

/** Swagger cho API tạo */
export const ApiCreate = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Tạo mới một ' + name }),
		ApiCreatedResponse({
			description: 'Tạo mới một ' + name + ' thành công',
			schema: { $ref: getSchemaPath($ref) }
		}),
		ApiBadRequestResponse({ description: 'Sai kiểu hoặc thiếu dữ liệu trong body' }),
		ApiConflictResponse({ description: 'Dữ liệu tạo bị trùng lặp (đã tạo rồi)' })
	);

/** Swagger cho API lấy danh sách */
export const ApiGetAll = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Lấy danh sách các ' + name }),
		ApiOkResponse({
			description: 'Lấy danh sách các ' + name + ' thành công',
			schema: { $ref: getSchemaPath($ref) }
		})
	);

/** Swagger cho API lấy chi tiết */
export const ApiGetOne = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Lấy chi tiết một ' + name }),
		ApiOkResponse({
			description: 'Lấy chi tiết một ' + name + ' thành công',
			schema: { $ref: getSchemaPath($ref) }
		}),
		ApiNotFoundResponse({ description: 'Không thể tìm thấy ' + name })
	);

/** Swagger cho API cập nhật */
export const ApiUpdate = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Cập nhật một ' + name }),
		ApiOkResponse({
			description: 'Cập nhật một ' + name + ' thành công',
			schema: { $ref: getSchemaPath($ref) }
		}),
		ApiBadRequestResponse({ description: 'Sai kiểu hoặc thiếu dữ liệu trong body' }),
		ApiNotFoundResponse({ description: 'Không thể tìm thấy ' + name })
	);

/** Swagger cho API xoá */
export const ApiDelete = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Xoá một ' + name }),
		ApiOkResponse({
			description: 'Xoá một ' + name + ' thành công',
			schema: { $ref: getSchemaPath($ref) }
		}),
		ApiNotFoundResponse({ description: 'Không thể tìm thấy ' + name })
	);

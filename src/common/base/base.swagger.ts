/* eslint-disable @typescript-eslint/ban-types */
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
import {
	ReferenceObject,
	SchemaObject
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const getBaseProperties = (
	status: number
): Record<string, SchemaObject | ReferenceObject> => {
	return {
		status: { example: status },
		message: { example: 'success' }
	};
};

export const getPaginationProperties = (): Record<string, SchemaObject | ReferenceObject> => {
	return {
		pagination: {
			properties: {
				limit: { example: 10 },
				page: { example: 1 },
				total: { example: 10 }
			}
		}
	};
};

export const getBaseSchema = (
	$ref: Function,
	status = 200
): SchemaObject & Partial<ReferenceObject> => {
	return {
		properties: {
			...getBaseProperties(status),
			data: { $ref: getSchemaPath($ref) }
		}
	};
};

export const getPaginationSchema = (
	$ref: Function,
	status = 200
): SchemaObject & Partial<ReferenceObject> => {
	return {
		properties: {
			...getBaseProperties(status),
			data: {
				type: 'array',
				items: {
					$ref: getSchemaPath($ref)
				}
			},
			...getPaginationProperties()
		}
	};
};

/** Swagger cho API tạo */
export const ApiCreate = ($ref: Function, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Tạo mới một ' + name }),
		ApiCreatedResponse({
			description: 'Tạo mới một ' + name + ' thành công',
			schema: getBaseSchema($ref, 201)
		}),
		ApiBadRequestResponse({ description: 'Sai kiểu hoặc thiếu dữ liệu trong body' }),
		ApiConflictResponse({ description: 'Dữ liệu tạo bị trùng lặp (đã tạo rồi)' })
	);

/** Swagger cho API lấy danh sách */
export const ApiGetAll = ($ref: Function, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Lấy danh sách các ' + name }),
		ApiOkResponse({
			description: 'Lấy danh sách các ' + name + ' thành công',
			schema: getPaginationSchema($ref)
		})
	);

/** Swagger cho API lấy chi tiết */
export const ApiGetOne = ($ref: Function, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Lấy chi tiết một ' + name }),
		ApiOkResponse({
			description: 'Lấy chi tiết một ' + name + ' thành công',
			schema: getBaseSchema($ref)
		}),
		ApiNotFoundResponse({ description: 'Không thể tìm thấy ' + name })
	);

/** Swagger cho API cập nhật */
export const ApiUpdate = ($ref: Function, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Cập nhật một ' + name }),
		ApiOkResponse({
			description: 'Cập nhật một ' + name + ' thành công',
			schema: getBaseSchema($ref)
		}),
		ApiBadRequestResponse({ description: 'Sai kiểu hoặc thiếu dữ liệu trong body' }),
		ApiNotFoundResponse({ description: 'Không thể tìm thấy ' + name })
	);

/** Swagger cho API xoá */
export const ApiDelete = ($ref: Function, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Xoá một ' + name }),
		ApiOkResponse({
			description: 'Xoá một ' + name + ' thành công',
			schema: getBaseSchema($ref)
		}),
		ApiNotFoundResponse({ description: 'Không thể tìm thấy ' + name })
	);

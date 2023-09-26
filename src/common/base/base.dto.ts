import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationDto {
	@IsOptional()
	@IsNumberString()
	@ApiProperty({ description: 'Số item mỗi trang', example: '10' })
	limit?: string;

	@IsOptional()
	@IsNumberString()
	@ApiProperty({ description: 'Số trang hiện tại', example: '1' })
	page?: string;

	@IsOptional()
	@ApiProperty({ description: 'Sort theo field', example: '{ "createdDate": "ASC" }' })
	sort?: string;

	@IsOptional()
	@ApiProperty({ description: 'Filter theo field', example: '{ "name": "string" }' })
	filter?: string;
}

export class GetAllQueryDto extends OmitType(PaginationDto, ['limit', 'page']) {}

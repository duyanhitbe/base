import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationDto {
	/** Số item mỗi trang */
	@IsOptional()
	@IsNumberString()
	@ApiProperty({ description: 'Số item mỗi trang', example: '10' })
	limit?: string;

	/** Số trang hiện tại */
	@IsOptional()
	@IsNumberString()
	@ApiProperty({ description: 'Số trang hiện tại', example: '1' })
	page?: string;

	/** Sort theo field */
	@IsOptional()
	@ApiProperty({ description: 'Sort theo field', example: '{ "createdAt": "ASC" }' })
	sort?: string;

	/** Filter theo field */
	@IsOptional()
	@ApiProperty({ description: 'Filter theo field', example: '{ "name": "string" }' })
	filter?: string;
}

export class GetAllQueryDto extends OmitType(PaginationDto, ['limit', 'page']) {}

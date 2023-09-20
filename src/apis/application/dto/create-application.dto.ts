import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
	/** Tên app */
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'Mã khách hàng' })
	name!: string;

	/** Mã khách hàng */
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'Mã khách hàng' })
	clientKey!: string;

	/** Mã bí mật */
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'Mã bí mật' })
	secretKey!: string;
}

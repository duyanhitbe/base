import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenApplicationDto {
	/** Mã khách hàng */
	@ApiProperty({ description: 'Mã khách hàng' })
	@IsString()
	@IsNotEmpty()
	clientKey!: string;

	/** Mã bí mật */
	@ApiProperty({ description: 'Mã bí mật' })
	@IsString()
	@IsNotEmpty()
	secretKey!: string;
}

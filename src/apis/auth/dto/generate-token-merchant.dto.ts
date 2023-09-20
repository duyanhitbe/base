import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenMerchantDto {
	/** Email */
	@ApiProperty({ description: 'Email' })
	@IsString()
	@IsNotEmpty()
	email!: string;

	/** Mật khẩu */
	@ApiProperty({ description: 'Mật khẩu' })
	@IsString()
	@IsNotEmpty()
	password!: string;
}

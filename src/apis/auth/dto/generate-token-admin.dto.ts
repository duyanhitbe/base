import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenAdminDto {
	/** Tài khoản */
	@ApiProperty({ description: 'Tài khoản' })
	@IsString()
	@IsNotEmpty()
	username!: string;

	/** Mật khẩu */
	@ApiProperty({ description: 'Mật khẩu' })
	@IsString()
	@IsNotEmpty()
	password!: string;
}

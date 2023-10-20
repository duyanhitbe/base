import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
	/** Mật khẩu cũ */
	@ApiProperty({ description: 'Mật khẩu cũ' })
	@IsString()
	@IsNotEmpty()
	oldPassword!: string;

	/** Mật khẩu mới */
	@ApiProperty({ description: 'Mật khẩu mới' })
	@IsString()
	@IsNotEmpty()
	newPassword!: string;
}

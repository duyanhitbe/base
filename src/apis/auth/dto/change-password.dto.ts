import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ChangePasswordDto {
	/** Mật khẩu cũ */
	@ApiProperty({ description: 'Mật khẩu cũ' })
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	oldPassword!: string;

	/** Mật khẩu mới */
	@ApiProperty({ description: 'Mật khẩu mới' })
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	newPassword!: string;
}

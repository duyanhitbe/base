import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateAdminDto {
	/** Tài khoản */
	@ApiProperty({ description: 'Tài khoản' })
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	username!: string;

	/** Mật khẩu */
	@ApiProperty({ description: 'Mật khẩu' })
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	password!: string;
}

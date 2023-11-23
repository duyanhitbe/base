import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateApplicationDto {
	/** Tên app */
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	@ApiProperty({ description: 'Mã khách hàng' })
	name!: string;

	/** Mã khách hàng */
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	@ApiProperty({ description: 'Mã khách hàng' })
	clientKey!: string;

	/** Mã bí mật */
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	@ApiProperty({ description: 'Mã bí mật' })
	secretKey!: string;
}

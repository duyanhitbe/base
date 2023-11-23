import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class GenerateTokenApplicationDto {
	/** Mã khách hàng */
	@ApiProperty({ description: 'Mã khách hàng' })
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	clientKey!: string;

	/** Mã bí mật */
	@ApiProperty({ description: 'Mã bí mật' })
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	secretKey!: string;
}

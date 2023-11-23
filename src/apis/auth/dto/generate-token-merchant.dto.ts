import { translate } from '@modules';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenMerchantDto {
	/** Email */
	@ApiProperty({ description: 'Email' })
	@IsString({ message: translate('validation.IS_STRING') })
	@IsNotEmpty({ message: translate('validation.IS_NOT_EMPTY') })
	email!: string;

	/** Mật khẩu */
	@ApiProperty({ description: 'Mật khẩu' })
	@IsString({ message: translate('validation.IS_STRING') })
	@IsNotEmpty({ message: translate('validation.IS_NOT_EMPTY') })
	password!: string;
}

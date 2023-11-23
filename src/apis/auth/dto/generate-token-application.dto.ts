import { translate } from '@modules';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenApplicationDto {
	/** Mã khách hàng */
	@ApiProperty({ description: 'Mã khách hàng' })
	@IsString({ message: translate('validation.IS_STRING') })
	@IsNotEmpty({ message: translate('validation.IS_NOT_EMPTY') })
	clientKey!: string;

	/** Mã bí mật */
	@ApiProperty({ description: 'Mã bí mật' })
	@IsString({ message: translate('validation.IS_STRING') })
	@IsNotEmpty({ message: translate('validation.IS_NOT_EMPTY') })
	secretKey!: string;
}

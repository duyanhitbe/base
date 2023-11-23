import { translate } from '@modules';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
	/** Tên app */
	@IsString({ message: translate('validation.IS_STRING') })
	@IsNotEmpty({ message: translate('validation.IS_NOT_EMPTY') })
	@ApiProperty({ description: 'Mã khách hàng' })
	name!: string;

	/** Mã khách hàng */
	@IsString({ message: translate('validation.IS_STRING') })
	@IsNotEmpty({ message: translate('validation.IS_NOT_EMPTY') })
	@ApiProperty({ description: 'Mã khách hàng' })
	clientKey!: string;

	/** Mã bí mật */
	@IsString({ message: translate('validation.IS_STRING') })
	@IsNotEmpty({ message: translate('validation.IS_NOT_EMPTY') })
	@ApiProperty({ description: 'Mã bí mật' })
	secretKey!: string;
}

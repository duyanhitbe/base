import { translate } from '@modules';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
	/** Mật khẩu cũ */
	@ApiProperty({ description: 'Mật khẩu cũ' })
	@IsString({ message: translate('validation.IS_STRING') })
	@IsNotEmpty({ message: translate('validation.IS_NOT_EMPTY') })
	oldPassword!: string;

	/** Mật khẩu mới */
	@ApiProperty({ description: 'Mật khẩu mới' })
	@IsString({ message: translate('validation.IS_STRING') })
	@IsNotEmpty({ message: translate('validation.IS_NOT_EMPTY') })
	newPassword!: string;
}

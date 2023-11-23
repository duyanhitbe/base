import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateMerchantDto {
	/** Email của đối tác */
	@IsEmail({}, { message: i18nValidationMessage('validation.IS_EMAIL') })
	@ApiProperty({ description: 'Email của đối tác' })
	email!: string;

	/** Mật khẩu */
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	@ApiProperty({ description: 'Mật khẩu' })
	password!: string;

	/** Tên đối tác */
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	@ApiProperty({ description: 'Tên đối tác' })
	name!: string;

	/** Số điện thoại đối tác */
	@IsNumberString({}, { message: i18nValidationMessage('validation.IS_NUMBER_STRING') })
	@IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
	@ApiProperty({ description: 'Số điện thoại đối tác' })
	phone!: string;

	/** Địa chỉ đối tác */
	@IsOptional()
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@ApiProperty({ description: 'Địa chỉ đối tác' })
	address?: string;

	/** Trang chủ của đối tác */
	@IsOptional()
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@ApiProperty({ description: 'Trang chủ của đối tác' })
	websiteUrl?: string;

	/** Facebook của đối tác */
	@IsOptional()
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@ApiProperty({ description: 'Facebook của đối tác' })
	facebookUrl?: string;

	/** Yotube của đối tác */
	@IsOptional()
	@IsString({ message: i18nValidationMessage('validation.IS_STRING') })
	@ApiProperty({ description: 'Yotube của đối tác' })
	youtubeUrl?: string;
}

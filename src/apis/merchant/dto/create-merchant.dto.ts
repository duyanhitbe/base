import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateMerchantDto {
	/** Email của đối tác */
	@IsEmail()
	@ApiProperty({ description: 'Email của đối tác' })
	email!: string;

	/** Mật khẩu */
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'Mật khẩu' })
	password!: string;

	/** Tên đối tác */
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'Tên đối tác' })
	name!: string;

	/** Số điện thoại đối tác */
	@IsNumberString()
	@IsNotEmpty()
	@ApiProperty({ description: 'Số điện thoại đối tác' })
	phone!: string;

	/** Địa chỉ đối tác */
	@IsOptional()
	@IsString()
	@ApiProperty({ description: 'Địa chỉ đối tác' })
	address?: string;

	/** Trang chủ của đối tác */
	@IsOptional()
	@IsString()
	@ApiProperty({ description: 'Trang chủ của đối tác' })
	websiteUrl?: string;

	/** Facebook của đối tác */
	@IsOptional()
	@IsString()
	@ApiProperty({ description: 'Facebook của đối tác' })
	facebookUrl?: string;

	/** Yotube của đối tác */
	@IsOptional()
	@IsString()
	@ApiProperty({ description: 'Yotube của đối tác' })
	youtubeUrl?: string;
}

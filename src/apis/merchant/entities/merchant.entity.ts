import { BaseEntityWithApplication } from '@common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity({ name: 'merchant' })
export class MerchantEntity extends BaseEntityWithApplication {
	/** Email của đối tác */
	@ApiProperty({ description: 'Email của đối tác' })
	@Column({ unique: true })
	email!: string;

	/** Mật khẩu */
	@ApiHideProperty()
	@Column()
	@Exclude()
	password!: string;

	/** Tên đối tác */
	@ApiProperty({ description: 'Tên đối tác' })
	@Column()
	name!: string;

	/** Số điện thoại đối tác */
	@ApiProperty({ description: 'Số điện thoại đối tác' })
	@Column()
	phone!: string;

	/** Địa chỉ đối tác */
	@ApiProperty({ description: 'Địa chỉ đối tác' })
	@Column({ nullable: true })
	address?: string;

	/** Trang chủ của đối tác */
	@ApiProperty({ description: 'Trang chủ của đối tác' })
	@Column({ nullable: true })
	websiteUrl?: string;

	/** Facebook của đối tác */
	@ApiProperty({ description: 'Facebook của đối tác' })
	@Column({ nullable: true })
	facebookUrl?: string;

	/** Yotube của đối tác */
	@ApiProperty({ description: 'Yotube của đối tác' })
	@Column({ nullable: true })
	youtubeUrl?: string;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await argon2.hash(this.password);
	}
}

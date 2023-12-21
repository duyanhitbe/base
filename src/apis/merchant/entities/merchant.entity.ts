import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { BaseEntityWithApplication } from 'src/common/base/base-with-application.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity({ name: 'merchant' })
export class MerchantEntity extends BaseEntityWithApplication {
	/** Tên tài khoản */
	@ApiProperty({ description: 'Tên tài khoản' })
	@Column({ unique: true })
	username!: string;

	/** Mật khẩu */
	@ApiHideProperty()
	@Column()
	@Exclude()
	password!: string;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await argon2.hash(this.password);
	}
}

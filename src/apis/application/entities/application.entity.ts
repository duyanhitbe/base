import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/base/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity({ name: 'application' })
export class ApplicationEntity extends BaseEntity {
	/** Tên app */
	@ApiProperty({ description: 'Tên app' })
	@Column()
	name!: string;

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

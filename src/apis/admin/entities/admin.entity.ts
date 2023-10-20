import { BaseEntity } from 'src/common/base/base.entity';
import { SCHEMA } from '@common';
import { ApiHideProperty } from '@nestjs/swagger';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity({ name: 'admin', schema: SCHEMA })
export class AdminEntity extends BaseEntity {
	/** Tài khoản */
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

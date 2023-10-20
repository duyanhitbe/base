import { BaseEntity } from 'src/common/base/base.entity';
import { SCHEMA } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'application', schema: SCHEMA })
export class ApplicationEntity extends BaseEntity {
	/** Tên app */
	@ApiProperty({ description: 'Tên app' })
	@Column()
	name!: string;

	/** Mã khách hàng */
	@ApiProperty({ description: 'Mã khách hàng' })
	@Column({ unique: true })
	clientKey!: string;

	/** Mã bí mật */
	@ApiProperty({ description: 'Mã bí mật' })
	@Column()
	secretKey!: string;
}

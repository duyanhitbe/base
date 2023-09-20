import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

export class BaseEntityWithApplication extends BaseEntity {
	/** Mã app */
	@ApiProperty({ description: 'Mã app' })
	@Column()
	applicationId!: string;

	/** app */
	@ApiHideProperty()
	@ManyToOne(() => ApplicationEntity)
	@JoinColumn({ name: 'applicationId' })
	application?: ApplicationEntity;
}

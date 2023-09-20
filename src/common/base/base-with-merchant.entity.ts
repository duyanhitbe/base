import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityWithApplication } from './base-with-application.entity';

export class BaseEntityWithMerchant extends BaseEntityWithApplication {
	/** Mã của merchant */
	@ApiProperty({ description: 'Mã của merchant' })
	@Column()
	merchantId!: string;

	/** Merchant */
	@ApiHideProperty()
	@ManyToOne(() => MerchantEntity)
	@JoinColumn({ name: 'merchantId' })
	merchant?: MerchantEntity;
}

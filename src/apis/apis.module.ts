import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { MerchantModule } from './merchant/merchant.module';

@Module({
	imports: [ApplicationModule, AdminModule, MerchantModule, AuthModule]
})
export class ApisModule {}

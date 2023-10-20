import { AdminModule } from '@apis/admin/admin.module';
import { ApplicationModule } from '@apis/application/application.module';
import { MerchantModule } from '@apis/merchant/merchant.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { IAuthService } from './auth.interface';
import { AuthService } from './auth.service';
import { AdminJwtStrategy } from './strategies/jwt/admin.jwt.strategy';
import { ApplicationJwtStrategy } from './strategies/jwt/application.jwt.strategy';
import { MerchantJwtStrategy } from './strategies/jwt/merchant.jwt.strategy';
import { AdminLocalStrategy } from './strategies/local/admin.local.strategy';
import { ApplicationLocalStrategy } from './strategies/local/application.local.strategy';
import { MerchantLocalStrategy } from './strategies/local/merchant.local.strategy';

@Module({
	imports: [PassportModule.register({}), AdminModule, ApplicationModule, MerchantModule],
	controllers: [AuthController],
	providers: [
		{
			provide: IAuthService,
			useClass: AuthService
		},
		AuthHelper,
		AdminLocalStrategy,
		ApplicationLocalStrategy,
		MerchantLocalStrategy,
		AdminJwtStrategy,
		ApplicationJwtStrategy,
		MerchantJwtStrategy,
		JwtService
	],
	exports: [IAuthService]
})
export class AuthModule {}

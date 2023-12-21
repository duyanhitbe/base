import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { UseAdminGuard, UseApplicationGuard, UseMerchantGuard, User } from '@common';
import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IAuthHandler } from './auth.interface';
import { ApiGenerateToken, ApiLogout } from './auth.swagger';
import { GenerateTokenAdminDto } from './dto/generate-token-admin.dto';
import { GenerateTokenApplicationDto } from './dto/generate-token-application.dto';
import { GenerateTokenMerchantDto } from './dto/generate-token-merchant.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: IAuthHandler) {}

	@Post('generate-token/admin')
	@UseGuards(AuthGuard('admin-local'))
	@HttpCode(200)
	@ApiGenerateToken('admin')
	generateTokenAdmin(@Req() req: Request, @Body() _body: GenerateTokenAdminDto) {
		const user = req.user as AdminEntity;
		return this.authService.generateToken('admin', user);
	}

	@Post('generate-token/application')
	@UseGuards(AuthGuard('merchant-local'))
	@HttpCode(200)
	@ApiGenerateToken('application')
	generateTokenApplication(@Req() req: Request, @Body() _body: GenerateTokenApplicationDto) {
		const user = req.user as ApplicationEntity;
		return this.authService.generateToken('application', user);
	}

	@Post('generate-token/merchant')
	@UseGuards(AuthGuard('merchant-local'))
	@HttpCode(200)
	@ApiGenerateToken('merchant')
	generateTokenMerchant(@Req() req: Request, @Body() _body: GenerateTokenMerchantDto) {
		const user = req.user as MerchantEntity;
		return this.authService.generateToken('merchant', user);
	}

	@Post('logout/admin')
	@UseAdminGuard()
	@HttpCode(200)
	@ApiLogout('admin')
	logoutAdmin(@User() user: Admin) {
		return this.authService.logout(user);
	}

	@Post('logout/application')
	@UseApplicationGuard()
	@HttpCode(200)
	@ApiLogout('application')
	logoutApplication(@User() user: Application) {
		return this.authService.logout(user);
	}

	@Post('logout/merchant')
	@UseMerchantGuard()
	@HttpCode(200)
	@ApiLogout('merchant')
	logoutMerchant(@User() user: Merchant) {
		return this.authService.logout(user);
	}
}

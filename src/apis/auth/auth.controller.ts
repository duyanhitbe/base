import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { UseAdminGuard, UseApplicationGuard, UseMerchantGuard, User } from '@common';
import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Request } from 'express';
import { IAuthHandler } from './auth.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GenerateTokenAdminDto } from './dto/generate-token-admin.dto';
import { GenerateTokenApplicationDto } from './dto/generate-token-application.dto';
import { GenerateTokenMerchantDto } from './dto/generate-token-merchant.dto';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
	constructor(private readonly authService: IAuthHandler) {}

	@Post('generate-token/admin')
	@UseGuards(AuthGuard('admin-local'))
	@HttpCode(200)
	@ApiOperation({ summary: 'Generate token cho Admin' })
	@ApiOkResponse({
		schema: {
			properties: {
				accessToken: { example: 'string' }
			}
		}
	})
	generateTokenAdmin(@Req() req: Request, @Body() _body: GenerateTokenAdminDto) {
		const user = req.user as AdminEntity;
		return this.authService.generateToken(user, 'admin');
	}

	@Post('generate-token/application')
	@UseGuards(AuthGuard('application-local'))
	@HttpCode(200)
	@ApiOperation({ summary: 'Generate token cho Application' })
	@ApiOkResponse({
		schema: {
			properties: {
				accessToken: { example: 'string' }
			}
		}
	})
	generateTokenApplication(@Req() req: Request, @Body() _body: GenerateTokenApplicationDto) {
		const user = req.user as ApplicationEntity;
		return this.authService.generateToken(user, 'application');
	}

	@Post('generate-token/merchant')
	@UseGuards(AuthGuard('merchant-local'))
	@HttpCode(200)
	@ApiOperation({ summary: 'Generate token cho Merchant' })
	@ApiOkResponse({
		schema: {
			properties: {
				accessToken: { example: 'string' }
			}
		}
	})
	generateTokenMerchant(@Req() req: Request, @Body() _body: GenerateTokenMerchantDto) {
		const user = req.user as MerchantEntity;
		return this.authService.generateToken(user, 'merchant');
	}

	@Post('logout/admin')
	@ApiOperation({ summary: 'Đăng xuất admin' })
	@UseAdminGuard()
	@HttpCode(200)
	@ApiOkResponse({
		schema: {
			properties: {
				success: { example: true }
			}
		}
	})
	logoutAdmin(@User() user: Admin) {
		return this.authService.logout(user);
	}

	@Post('logout/application')
	@ApiOperation({ summary: 'Đăng xuất application' })
	@UseApplicationGuard()
	@HttpCode(200)
	@ApiOkResponse({
		schema: {
			properties: {
				success: { example: true }
			}
		}
	})
	logoutApplication(@User() user: Application) {
		return this.authService.logout(user);
	}

	@Post('logout/merchant')
	@ApiOperation({ summary: 'Đăng xuất merchant' })
	@UseMerchantGuard()
	@HttpCode(200)
	@ApiOkResponse({
		schema: {
			properties: {
				success: { example: true }
			}
		}
	})
	logoutMerchant(@User() user: Merchant) {
		return this.authService.logout(user);
	}

	@Post('change-password/admin')
	@ApiOperation({ summary: 'Đổi mật khẩu admin' })
	@UseAdminGuard()
	@HttpCode(200)
	@ApiOkResponse({
		schema: {
			$ref: getSchemaPath(AdminEntity)
		}
	})
	changePasswordAdmin(@User() user: Admin, @Body() changePasswordDto: ChangePasswordDto) {
		return this.authService.changePassword(user, changePasswordDto);
	}

	@Post('change-password/merchant')
	@ApiOperation({ summary: 'Đổi mật khẩu user' })
	@UseMerchantGuard()
	@HttpCode(200)
	@ApiOkResponse({
		schema: {
			$ref: getSchemaPath(MerchantEntity)
		}
	})
	changePasswordUser(@User() user: Merchant, @Body() changePasswordDto: ChangePasswordDto) {
		return this.authService.changePassword(user, changePasswordDto);
	}
}

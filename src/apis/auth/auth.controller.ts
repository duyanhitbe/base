import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { GenerateTokenAdminDto } from './dto/generate-token-admin.dto';
import { GenerateTokenApplicationDto } from './dto/generate-token-application.dto';
import { GenerateTokenMerchantDto } from './dto/generate-token-merchant.dto';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('generate-token/admin')
	@UseGuards(AuthGuard('admin-local'))
	@ApiOperation({ summary: 'Generate token cho Admin' })
	@ApiResponse({
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
	@ApiOperation({ summary: 'Generate token cho Application' })
	@ApiResponse({
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
	@ApiOperation({ summary: 'Generate token cho Merchant' })
	@ApiResponse({
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
}

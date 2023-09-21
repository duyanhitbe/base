import { AdminService } from '@apis/admin/admin.service';
import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationService } from '@apis/application/application.service';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { MerchantService } from '@apis/merchant/merchant.service';
import { RedisPrefix, ReqUser } from '@common';
import { RedisService } from '@modules';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AuthHelper } from './auth.helper';
import { UserType } from './auth.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly authHelper: AuthHelper,
		private readonly adminService: AdminService,
		private readonly applicationService: ApplicationService,
		private readonly merchantService: MerchantService,
		private readonly jwtService: JwtService,
		private readonly redisService: RedisService
	) {}

	/** Xác thực tài khoản admin */
	async validateAdmin(username: string, password: string) {
		const admin = await this.adminService.getOne({ where: { username } });
		if (!admin) {
			throw new UnauthorizedException('Tài khoản không tồn tại');
		}
		const comparePassword = await argon2.verify(admin.password, password);
		if (!comparePassword) {
			throw new UnauthorizedException('Sai mật khẩu');
		}
		return admin;
	}

	/** Xác thực tài khoản app */
	async validateApplication(clientKey: string, secretKey: string) {
		const application = await this.applicationService.getOne({ where: { clientKey } });
		if (!application) {
			throw new UnauthorizedException('Tài khoản không tồn tại');
		}
		if (application.secretKey !== secretKey) {
			throw new UnauthorizedException('Sai secret key');
		}
		return application;
	}

	/** Xác thực tài khoản đối tác */
	async validateMerchant(email: string, password: string) {
		const merchant = await this.merchantService.getOne({ where: { email } });
		if (!merchant) {
			throw new UnauthorizedException('Tài khoản không tồn tại');
		}
		const comparePassword = await argon2.verify(merchant.password, password);
		if (!comparePassword) {
			throw new UnauthorizedException('Sai mật khẩu');
		}
		return merchant;
	}

	/** Xác thực tài khoản bằng id */
	async validateById(id: string, type: UserType) {
		let user;
		switch (type) {
			case 'admin':
				user = await this.adminService.getOneById(id);
				break;
			case 'application':
				user = await this.applicationService.getOneById(id);
				break;
			case 'merchant':
				user = await this.merchantService.getOneById(id);
				break;
		}
		if (!user) {
			throw new UnauthorizedException(`${type} not found`);
		}
	}

	/** Lấy key của access token trong cache */
	private getRedisKey(id: string) {
		return `${RedisPrefix.ACCESS_TOKEN}:${id}`;
	}

	/** Lấy danh sách token trong cache */
	private async getListToken(id: string): Promise<string[]> {
		const redisKey = this.getRedisKey(id);
		const tokenString = await this.redisService.get(redisKey);
		if (!tokenString) {
			return [];
		}
		const listToken = JSON.parse(tokenString) as string[];
		return listToken;
	}

	/** Kiểm tra token có tồn tại trong cache chưa */
	async validateToken(token: string, id: string) {
		const listToken = await this.getListToken(id);
		if (!listToken.includes(token)) {
			throw new UnauthorizedException('invalid token');
		}
	}

	/** Lưu token vào cache */
	private async cacheToken(id: string, accessToken: string) {
		const redisKey = this.getRedisKey(id);
		const listToken = await this.getListToken(id);
		listToken.push(accessToken);
		this.redisService.setNx(redisKey, JSON.stringify(listToken));
	}

	/** Tạo accessToken */
	async generateToken(user: AdminEntity | ApplicationEntity | MerchantEntity, type: UserType) {
		/** Secret JWT */
		const secret = process.env.SECRET_JWT;
		const payload = this.authHelper.getJwtPayload(user, type);

		/** Generate Token */
		const accessToken = this.jwtService.sign(payload, { secret });

		/** Cache token */
		this.cacheToken(payload.id, accessToken);

		return { accessToken };
	}

	/** Đăng xuất */
	async logout(user: ReqUser) {
		const id = this.authHelper.getUserId(user);

		/** Xóa token khỏi cache */
		const redisKey = this.getRedisKey(id);
		const listToken = await this.getListToken(id);
		const updatedListToken = listToken.filter((token) => token !== user.token);
		this.redisService.setNx(redisKey, JSON.stringify(updatedListToken));

		return { success: true };
	}
}

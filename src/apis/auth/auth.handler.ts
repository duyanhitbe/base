import { IAdminService } from '@apis/admin/admin.interface';
import { IApplicationService } from '@apis/application/application.interface';
import { IMerchantService } from '@apis/merchant/merchant.interface';
import { RedisPrefix } from '@common';
import { RedisService } from '@modules';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { IAuthHandler, IAuthService } from './auth.interface';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthHandler extends IAuthHandler {
	constructor(
		private readonly authService: IAuthService,
		private readonly adminService: IAdminService,
		private readonly merchantService: IMerchantService,
		private readonly applicationService: IApplicationService,
		private readonly jwtService: JwtService,
		private readonly redisService: RedisService
	) {
		super();
	}

	/** Lấy thông tin tài khoản */
	private getUserByUserType(
		type: UserType,
		options: FindOrFailOptions<User>
	): Promise<User | null> {
		switch (type) {
			case 'admin':
				return this.adminService.getOne(options);
			case 'application':
				return this.applicationService.getOne(options);
			case 'merchant':
				return this.merchantService.getOne(options);
		}
	}

	/** Xác thực tài khoản */
	async validateUser(type: UserType, username: string, password: string): Promise<User> {
		const user = await this.getUserByUserType(type, { where: { username } });
		if (!user) {
			throw new UnauthorizedException('Tài khoản không tồn tại');
		}
		const comparePassword = await argon2.verify(user.password, password);
		if (!comparePassword) {
			throw new UnauthorizedException('Sai mật khẩu');
		}
		return user;
	}

	/** Xác thực tài khoản bằng id */
	async validateById(type: UserType, id: string) {
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
	async generateToken(type: UserType, user: User) {
		/** Secret JWT */
		const secret = process.env.SECRET_JWT;
		const payload = this.authService.getJwtPayload(user, type);

		/** Generate Token */
		const accessToken = this.jwtService.sign(payload, { secret });

		/** Cache token */
		this.cacheToken(payload.id, accessToken);

		return { accessToken };
	}

	/** Đăng xuất */
	async logout(user: ReqUser) {
		const id = this.authService.getUserId(user);

		/** Xóa token khỏi cache */
		const redisKey = this.getRedisKey(id);
		const listToken = await this.getListToken(id);
		const updatedListToken = listToken.filter((token) => token !== user.token);
		this.redisService.setNx(redisKey, JSON.stringify(updatedListToken));

		return { success: true };
	}

	/** Đổi mật khẩu */
	async changePassword(userReq: ReqUser, dto: ChangePasswordDto) {
		let user: User | null = null;
		switch (userReq.type) {
			case 'admin':
				user = await this.adminService.getOneByIdOrFail(userReq.adminId);
				break;
			case 'merchant':
				user = await this.merchantService.getOneByIdOrFail(userReq.merchantId);
				break;
		}
		if (!user) {
			throw new UnauthorizedException('invalid user');
		}
		const comparePassword = await argon2.verify(user.password, dto.oldPassword);
		if (!comparePassword) {
			throw new UnauthorizedException('Mật khẩu cũ không đúng');
		}
		const newHashedPassword = await argon2.hash(dto.newPassword);
		user.password = newHashedPassword;
		return user.save();
	}
}

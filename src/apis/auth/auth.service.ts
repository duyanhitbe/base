import { AdminService } from '@apis/admin/admin.service';
import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationService } from '@apis/application/application.service';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { MerchantService } from '@apis/merchant/merchant.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
	constructor(
		private readonly adminService: AdminService,
		private readonly applicationService: ApplicationService,
		private readonly merchantService: MerchantService,
		private readonly jwtService: JwtService
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
	async validateById(id: string, type: 'admin' | 'application' | 'merchant') {
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

	/** Tạo accessToken */
	generateToken(
		user: AdminEntity | ApplicationEntity | MerchantEntity,
		type: 'admin' | 'application' | 'merchant'
	) {
		let accessToken = '';
		/** Secret JWT */
		const secret = process.env.SECRET_JWT;
		if (type === 'admin') {
			user = user as AdminEntity;
			const payload = { id: user.id, type };
			accessToken = this.jwtService.sign(payload, { secret });
		}
		if (type === 'application') {
			user = user as ApplicationEntity;
			const payload = { id: user.id, type };
			accessToken = this.jwtService.sign(payload, { secret });
		}
		if (type === 'merchant') {
			user = user as MerchantEntity;
			const payload = { id: user.id, applicationId: user.applicationId, type };
			accessToken = this.jwtService.sign(payload, { secret });
		}
		return { accessToken };
	}
}

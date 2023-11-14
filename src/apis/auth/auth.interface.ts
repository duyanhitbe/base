import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

export abstract class IAuthService {
    /** Lấy id của user */
    abstract getUserId(user: ReqUser): string;

    /** Lấy payload token */
    abstract getJwtPayload(user: AdminEntity, type: 'admin'): JWTPayload;
    abstract getJwtPayload(user: ApplicationEntity, type: 'application'): JWTPayload;
    abstract getJwtPayload(user: MerchantEntity, type: 'merchant'): JWTPayload;
    abstract getJwtPayload(user: AdminEntity | ApplicationEntity | MerchantEntity, type: UserType): JWTPayload;
}

export abstract class IAuthHandler {
    /** Kiểm tra tài khoản admin */
	abstract validateAdmin(username: string, password: string): Promise<AdminEntity>;
    /** Kiểm tra tài khoản application */
	abstract validateApplication(clientKey: string, secretKey: string): Promise<ApplicationEntity>;
    /** Kiểm tra tài khoản merchant */
	abstract validateMerchant(email: string, password: string): Promise<MerchantEntity>;
    /** Kiểm tra tài khoản bằng id */
    abstract validateById(id: string, type: UserType): Promise<void>;
    /** Tạo token */
    abstract generateToken(user: AdminEntity | ApplicationEntity | MerchantEntity, type: UserType): Promise<GenerateTokenData>;
    /** Đăng xuất */
    abstract logout(user: ReqUser): Promise<LogoutData>;
    /** Đổi mật khẩu */
    abstract changePassword(userReq: ReqUser, dto: ChangePasswordDto): Promise<AdminEntity | MerchantEntity>;
    /** Kiểm tra token có đúng không */
    abstract validateToken(token: string, id: string): Promise<void>;
}

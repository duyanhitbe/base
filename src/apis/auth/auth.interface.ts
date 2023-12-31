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
    abstract getJwtPayload(user: User, type: UserType): JWTPayload;
}

export abstract class IAuthHandler {
	abstract validateUser(type: UserType, username: string, password: string): Promise<User>;
    /** Kiểm tra tài khoản bằng id */
    abstract validateById(type: UserType, id: string): Promise<void>;
    /** Tạo token */
    abstract generateToken(type: UserType, user: User): Promise<GenerateTokenData>;
    /** Đăng xuất */
    abstract logout(user: ReqUser): Promise<LogoutData>;
    /** Đổi mật khẩu */
    abstract changePassword(userReq: ReqUser, dto: ChangePasswordDto): Promise<User>;
    /** Kiểm tra token có đúng không */
    abstract validateToken(token: string, id: string): Promise<void>;
}

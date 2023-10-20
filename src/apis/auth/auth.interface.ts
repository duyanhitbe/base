import { AdminEntity } from '@apis/admin/entities/admin.entity';
import { ApplicationEntity } from '@apis/application/entities/application.entity';
import { MerchantEntity } from '@apis/merchant/entities/merchant.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

export abstract class IAuthService {
	abstract validateAdmin(username: string, password: string): Promise<AdminEntity>;
	abstract validateApplication(clientKey: string, secretKey: string): Promise<ApplicationEntity>;
	abstract validateMerchant(email: string, password: string): Promise<MerchantEntity>;
    abstract validateById(id: string, type: UserType): Promise<void>;
    abstract generateToken(user: AdminEntity | ApplicationEntity | MerchantEntity, type: UserType): Promise<GenerateTokenData>;
    abstract logout(user: ReqUser): Promise<LogoutData>;
    abstract changePassword(userReq: ReqUser, dto: ChangePasswordDto): Promise<AdminEntity | MerchantEntity>;
    abstract validateToken(token: string, id: string): Promise<void>;
}

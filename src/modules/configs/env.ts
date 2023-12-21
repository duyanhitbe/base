import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const SCHEMA = configService.get<string>('DB_SCHEMA');

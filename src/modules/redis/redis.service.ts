import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { MetadataKey } from 'src/common/constants';

@Injectable()
export class RedisService {
	constructor(@Inject(MetadataKey.REDIS) private redis: Redis) {}

	async set(key: string, value: string, expired: string | number): Promise<'OK'> {
		await this.del(key);
		return this.redis.set(key, value, 'EX', expired);
	}
	async setNx(key: string, value: string): Promise<number> {
		await this.del(key);
		return this.redis.setnx(key, value);
	}
	get(key: string): Promise<string | null> {
		return this.redis.get(key);
	}
	del(key: string) {
		return this.redis.del(key);
	}
	keys(prefix: string) {
		return this.redis.keys(`${prefix}:*`);
	}
}

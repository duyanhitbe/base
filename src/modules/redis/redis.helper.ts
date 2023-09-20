import { RedisPrefix } from './redis.enum';

export class RedisHelper {
	static getKeyWithPrefix(prefix: RedisPrefix, key: string) {
		return prefix + ':' + key;
	}
	static getAccessTokenKey(id: string) {
		return this.getKeyWithPrefix(RedisPrefix.ACCESS_TOKEN, id);
	}
	static getRefreshTokenKey(id: string) {
		return this.getKeyWithPrefix(RedisPrefix.REFRESH_TOKEN, id);
	}
}

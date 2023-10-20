declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/** Môi trường */
			NODE_ENV: 'dev' | 'staging' | 'production';
			/** Port của app */
			PORT: number;
			/** Tên schema của database */
			SCHEMA: string;
			/** Host của database */
			DB_HOST: string;
			/** Port của database */
			DB_PORT: number;
			/** Username của database */
			DB_USERNAME: string;
			/** Password của database */
			DB_PASSWORD: string;
			/** Tên của database */
			DB_NAME: string;
			/** Host của redis */
			REDIS_HOST: string;
			/** Port của redis */
			REDIS_PORT: number;
			/** DB index của redis */
			REDIS_DB: string;
			/** Password của redis */
			REDIS_PASSWORD: string;
			/** Prefix key của redis */
			REDIS_PREFIX: string;
			/** Mã bí mật jwt */
			SECRET_JWT: string;
		}
	}
}

export {};

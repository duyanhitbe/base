import { BaseEntity } from '@common';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

declare global {
	type FindOptions<T extends BaseEntity> = {
		/** Điều kiện */
		where: FindOptionsWhere<T> | FindOptionsWhere<T>[];
		/** Sắp xếp */
		order?: FindOptionsOrder<T>;
		/** Nối bảng */
		relations?: string[];
		/** Lọc theo field */
		filter?: string;
		/** Bật tắt eager */
		loadEagerRelations?: boolean;
	};

	type FindOrFailOptions<T extends BaseEntity> = FindOptions<T> & {
		/** Thông báo khi không tìm thấy record */
		errorMessage?: string;
	};

	type FindWithPaginationOptions<T extends BaseEntity> = Partial<FindOptions<T>> & {
		/** Số item trong một trang */
		limit?: string;
		/** Số trang hiện tại */
		page?: string;
		/**
		 * Sắp xếp
		 * @example {"createdAt": "ASC"}
		 */
		sort?: string;
		/**
		 * Lọc
		 * @examples { "name": "ABC" }
		 */
		filter?: string;
	};

	type IPaginationResponse<T> = {
		/** Mảng các items */
		data: T[];
		pagination: {
			/** Số item trong một trang */
			limit: number;
			/** Số trang hiện tại */
			page: number;
			/** Tổng số lượng item */
			total: number;
		};
	};

	type IResponse<T> = {
		/** Response status code */
		status: number;
		/** Thông báo */
		message: string;
		/** Dữ liệu */
		data: T;
		/** Dữ liệu phân trang */
		pagination?: {
			/** Số item trong một trang */
			limit: number;
			/** Số trang hiện tại */
			page: number;
			/** Tổng số lượng item */
			total: number;
		};
	};

	type CountInNumberOfDayData = {
		/**
		 * Mảng các label format theo DD-MM
		 * @examples ["01-01", "02-01", "03-01"]
		 */
		labels: string[];
		/**
		 * Mảng các số lượng của items theo ngày
		 * @examples [100, 200, 300]
		 */
		values: number[];
	};

	type GenerateTokenData = {
		accessToken: string;
	};

	type LogoutData = {
		success: boolean;
	};
}

export {};

import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
	private logger = new Logger('TypeORMError');

	catch(exception: TypeORMError, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse();
		const message: string = (exception as TypeORMError).message;
		const code: number = (exception as any).code;
		const customResponse = {
			status: 500,
			message: 'Internal Server Error',
			errors: [{ code: code, message: message }]
		};
		this.logger.error(JSON.stringify(exception));
		response.status(customResponse.status).json(customResponse);
	}
}
